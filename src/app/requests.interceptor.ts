import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { MessagesService } from './messages/messages.service';

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService)
  loadingService.loadingOn()
  return next(req).pipe(finalize(() => loadingService.loadingOff()))
}

export function errorMessageInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const messagesService = inject(MessagesService)
  return next(req).pipe(tap((event) => event instanceof HttpResponse && messagesService.messageOff()), catchError((response) => {
    messagesService.messageOn()
    return of(response)
  }))
}
