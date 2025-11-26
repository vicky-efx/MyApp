import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Websocket {
  private ws!: WebSocket;
  private messageSubject = new Subject<any>();

  connect(userId: number) {
    this.ws = new WebSocket(`ws://localhost:8080/ws/${userId}`);

    this.ws.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.ws.onopen = () => console.log("WS Connected");

    this.ws.onclose = () => console.log("WS Disconnected");
  }

  onMessage() {
    return this.messageSubject.asObservable();
  }

  sendMessage(msg: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
