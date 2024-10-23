import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | undefined;

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket$ = webSocket('ws://localhost:8080'); // Replace with your server URL

    this.socket$.subscribe({
      next: (message) => console.log('Received: ', message),
      error: (err) => console.error(err),
      complete: () => console.warn('Connection closed')
    });
  }

  sendMessage(msg: any): void {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }

  getMessages(): Observable<any> {
    return this.socket$ ? this.socket$.asObservable() : new Observable();
  }

  close(): void {
    this.socket$?.complete();
  }
}