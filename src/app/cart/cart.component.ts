import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart : any[] = [];

  constructor(private cacheService: CacheService) {}

  ngOnInit(): void {
    // Fetch the cart data when the component initializes
    this.cart = this.cacheService.getCart();
  }

  formatPrice(price: number): string {
    // Divide the price by 100 to convert it to dollars
    const dollars = price / 100;
    // Format the price with two decimal places and add the "$" symbol
    return `$${dollars}`;
  }
}
