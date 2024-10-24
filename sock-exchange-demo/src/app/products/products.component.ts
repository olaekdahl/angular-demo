import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductsService]
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private readonly socksService: ProductsService) {
    this.socksService.getProducts().subscribe(data => this.products = data);
  }
}

