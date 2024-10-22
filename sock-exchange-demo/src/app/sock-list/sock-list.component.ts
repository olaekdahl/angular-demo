import { Component, inject, OnInit } from '@angular/core';
import { SocksService } from '../services/socks.service';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sock-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sock-list.component.html',
  styleUrl: './sock-list.component.css',
  providers: [SocksService]
})
export class SockListComponent {
  // private sockService = inject(SocksService);
  // socks: any[] = this.sockService.getSocks();
  socks: any[] = [];

  constructor(private readonly socksService: SocksService) {
    this.socksService.getSocks().subscribe(data => this.socks = data);
  }
}
