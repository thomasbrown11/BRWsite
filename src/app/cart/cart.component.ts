import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { SquareService } from '../square/square.service';

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
  checkingOut: boolean = false;
  loading: boolean = false;
  checkoutUrl: string = '';

  constructor(private cacheService: CacheService, private squareService: SquareService) {}

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
        //handle if checkout open.. checkout link will be invalid if cart altered
        if (this.checkingOut) {
         this.checkingOut = false;
        }
        //push change to cached Cart
        this.cacheService.updateCart(this.cart);
      }
    } else {
      //incrmement as there is no limit
      item.quantity = item.quantity + 1;
      this.subTotal += item.price;
      //handle if checkout open.. checkout link will be invalid if cart altered
      if (this.checkingOut) {
       this.checkingOut = false;
      }
      //push change to cached Cart
      this.cacheService.updateCart(this.cart);
    }
  }

  decrementQuantity(item: any): void {
    //if more than 1 item you may decrement. Full removal handled elsewhere
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      this.subTotal -= item.price;
      //handle if checkout open.. checkout link will be invalid if cart altered
      if (this.checkingOut) {
        this.checkingOut = false;
      }
      //push change to cached Cart
      this.cacheService.updateCart(this.cart);
    }
  }

  removeFromCart(item: any, index: number): void {
    //remove item from cart
    this.cart.splice(index, 1);
    //if cart empty trigger empty cart view
    if (this.cart.length < 1) {
      this.cartEmpty = true;
    }
    //update subtotal to reflect removed item
    this.subTotal -= (item.price * item.quantity);
    //handle if checkout open.. checkout link will be invalid if cart altered
    if (this.checkingOut) {
      this.checkingOut = false;
    }
    //update cache
    this.cacheService.updateCart(this.cart);
  }

  generateCheckoutLink(): void {
    console.log('checkout test');
    //activate checkout dialogue
    this.checkingOut = true;
    // Set loading to true while waiting for the response
    this.loading = true;
    //format cart to pass for link generation
    const lineItems = this.cart.map(item => {
      return {
        quantity: item.quantity.toString(),
        catalog_object_id: item.variant,
      };
    });
    console.log(`lineItems: ${lineItems}`) //testing

    // Call the service method and subscribe to the observable
    this.squareService.generateLink(JSON.stringify(lineItems))
    .subscribe(
      (response) => {
        // Handle the response as needed
        console.log('Generated payment link:', response);

        // Assign the URL to the class-level variable
        if (response?.payment_link?.url) {
          this.checkoutUrl = response.payment_link.url;
        }
        // Set loading to false once the response is received
        this.loading = false;
      },
      (error) => {
        console.error('Error generating payment link', error);

        // Log specific error details from the Square API response
        if (error.response && error.response.data && error.response.data.errors) {
          console.error('Square API errors:', error.response.data.errors);
        }

        // Set loading to false once error thrown
        this.loading = false;
      }
    );
  }

}
