import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessagesService {
  private messageSubject = new BehaviorSubject<boolean>(false);
  message$: Observable<boolean> = this.messageSubject.asObservable()
  constructor() { }

  messageOn() {
    this.messageSubject.next(true)

  }
  messageOff() {
    this.messageSubject.next(false)

  }
}
