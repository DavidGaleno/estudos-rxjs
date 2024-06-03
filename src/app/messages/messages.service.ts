import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.messageSubject.asObservable();
  constructor() { }


  showErrors(...errors: string[]) {
    this.messageSubject.next(errors)
  }
}
