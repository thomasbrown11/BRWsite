import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart : any[] = [];
  cartEmpty : boolean = false;
  quantity: number = 1;
  subTotal: number = 0;
  placeholderImage: any = '../../assets/image-placeholder.png';

  constructor(private cacheService: CacheService) {}

  ngOnInit(): void {
    // Fetch the cart data when the component initializes
    this.cart = this.cacheService.getCart();

    for(let item of this.cart) {
      this.subTotal += item.price * item.quantity;
    }

    if (this.cart.length < 1) {
      this.cartEmpty = true;
    }
  }

  formatPrice(price: number): string {
    // Divide the price by 100 to convert it to dollars
    const dollars = price / 100;
    // Format the price with two decimal places and add the "$" symbol
    return `$${dollars}`;
  }

  incrementQuantity(item: any): void {

    //if item passed a quantity limit then test
    if (item.limit) {
      //if still below limit incrememnt
      if (item.quantity < item.limit) {
        item.quantity = item.quantity + 1;
        this.subTotal += item.price;
        //push change to cached Cart
        this.cacheService.updateCart(this.cart);
      }
    } else {
      //incrmement as there is no limit
      item.quantity = item.quantity + 1;
      this.subTotal += item.price;
      //push change to cached Cart
      this.cacheService.updateCart(this.cart);
    }
  }

  decrementQuantity(item: any): void {
    //if more than 1 item you may decrement. Full removal handled elsewhere
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      this.subTotal -= item.price;
      //push change to cached Cart
      this.cacheService.updateCart(this.cart);
    }
  }
}
