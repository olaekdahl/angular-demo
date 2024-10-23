import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit, OnDestroy {
  message = '';
  messages: string[] = [];
  private wsSubscription: Subscription | undefined;

  constructor(private readonly websocketService: WebSocketService) {}

  ngOnInit(): void {
    this.wsSubscription = this.websocketService.getMessages().subscribe({
      next: (msg) => this.messages.push(JSON.stringify(msg)),
      error: (err) => console.error(err)
    });
  }

  sendMessage(): void {
    this.websocketService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
    this.websocketService.close();
  }
}