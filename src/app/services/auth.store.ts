import { HttpClient } from '@angular/common/http';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';

const AUTH_DATA = "auth_data"

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private userSubject = new BehaviorSubject<User>(null)
  user$: Observable<User> = this.userSubject.asObservable()
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private messageService: MessagesService) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user))
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn))
    const user = localStorage.getItem(AUTH_DATA)
    user && this.userSubject.next(JSON.parse(user))
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>("/api/login", { email, password }).pipe(
      tap(user => {
        this.userSubject.next(user)
        localStorage.setItem(AUTH_DATA, JSON.stringify(user))
      }),
      catchError(err => {
        this.messageService.showErrors('Autentição não foi feita')
        return throwError(err)
      }), shareReplay())
  }
  logout() {
    this.userSubject.next(null)
    localStorage.removeItem(AUTH_DATA)
  }
}

