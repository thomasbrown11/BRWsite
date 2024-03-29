import { Component, OnInit } from '@angular/core';
import { SquareService } from '../square/square.service';
import { CacheService } from '../cache.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-square-single-view',
  templateUrl: './square-single-view.component.html',
  styleUrls: ['./square-single-view.component.scss']
})
export class SquareSingleViewComponent implements OnInit {

  id: string | null = ''; //id pulled from the link route parameter
  imageMap: any = {}; //imageMap contains urls with keys equal to item id
  itemEnlarged: any; //controls single item view
  currentImage: any = {};  //current image shown in enlarged image view

  placeholderImage: any = '../../assets/image-placeholder.png';

  currentImageIndex: number = 0; //used to toggle via item_data.image_ids array
  isBubbleSelected: boolean = false; // handle styling on bubble selected

  inStock: boolean = true; //controls whether out of stock screen appears
  stockMap: any = {}; //populate with stock counts for item purchase limiting

  //color map for item select display
  colorMap: any = {
    "Spotted Veridian": "#1A8F72",
    "Translucent Blue Emerald": "#07ADAD",
    "Red": "#FF0000",
    "Blue": "#5174D1",
    "Yellow": "#F7C03E",
    "White": "#FFFFFF"
  }

  colorArray: any[] = []; //populate array with array values
  colorIsSelected: boolean = false; //toggle image array views to color variants
  currentColorIndex: number = 0; //tracks selected color or set to 0 for Regular variant (ie no colors on item)
  currentColorId: string = '';

  quantity: number = 1; //denotes how many of the item is being added to cart
  subTotal: number = 0;

  inStockItems: string[] = []; //populated by checkStock method to check inventory on all in stock items


  // itemImageArray: any[] = []; //should save all image_ids from object here so that you can alter it when colors selected

  constructor(private route: ActivatedRoute, private router: Router, private squareService: SquareService, private cacheService: CacheService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // save route parameter id for item match
      const itemId = params.get('id');
      this.id = itemId;
    });

    //call square getCatalogue to get loop match for item id, populate imageMap
    this.fetchCatalogData();

    console.log(this.itemEnlarged);
    console.log('current color id', this.currentColorId);

    //check if item in stock
    this.checkStock();

    if(this.inStock) {
      this.getStockCount(this.inStockItems);
    }

    console.log(`in stock?: ${this.inStock}`)
    console.log(`current image is: ${this.currentImage}`)
  }


  fetchCatalogData() {
    this.squareService.getCatalogue().subscribe(data => {
      // Find item based on route parameter id string match
      const matchedItem = data.items.find((item: any) => item.id === this.id);

      if (matchedItem) {

        //populate imageMap
        this.squareService.getImages().subscribe(data => {
        this.imageMap = data;
        });
        //set itemEnlarged to matched item
        this.itemEnlarged = matchedItem;
        this.subTotal = this.itemEnlarged.item_data.variations[0].item_variation_data.price_money.amount;
        //populate local array with the image_ids array from api response
        // this.itemImageArray = this.itemEnlarged.item_data.image_ids;
        // this.currentImage = this.imageMap[this.itemImageArray[0]]; //MAY NOT NEED THIS IF YOU CAN MANIPULATE ARRAY FROM ITEMENLARGED INSTEAD

        //TESTING
        if (this.itemEnlarged.item_data.image_ids) {
          this.currentImage = this.imageMap[this.itemEnlarged.item_data.image_ids[0]];
        } else {
          this.currentImage = this.placeholderImage;
        }
        // this.currentImage = this.imageMap[this.itemEnlarged.item_data.image_ids[0]]; //initiate viewable image in item as first image id in array
        this.currentColorId = this.itemEnlarged.item_data.variations[0].id;
      }
    });
  }

  checkStock(): void {

    //if item has no variants and is out of stock
    if (this.itemEnlarged.item_data.variations[0].item_variation_data.location_overrides?.[0]?.sold_out && this.itemEnlarged.item_data.variations[0].item_variation_data.name === 'Regular') {
      console.log(`no stock: sold out?: ${this.itemEnlarged.item_data.variations[0].item_variation_data.location_overrides?.[0]?.sold_out}, name: ${this.itemEnlarged.item_data.variations[0].item_variation_data.name}`);
      this.inStock = false;
      return;
    } else {
      //item is in stock or has variants
      console.log(`in stock: sold out?: ${this.itemEnlarged.item_data.variations[0].item_variation_data.location_overrides?.[0]?.sold_out}, name: ${this.itemEnlarged.item_data.variations[0].item_variation_data.name}`);
    }
     // If the 'Regular' variant is not out of stock and it's the first variant implies no colors.. return in stock and break method
     if (this.itemEnlarged.item_data.variations[0].item_variation_data.name === 'Regular') {
      // this.inStock = true;
      this.inStockItems.push(this.itemEnlarged.item_data.variations[0].id);
      console.log(`this.inStockItems ${this.inStockItems} verifies Regular name was recognized`)
      return
    }

    //Item has variants: loop through and push and in stock items to inStockArray for inventory check
    for (let i = 0; i < this.itemEnlarged.item_data.variations.length; i++) {
      const variation = this.itemEnlarged.item_data.variations[i];
      // console.log(variation);
      // if variant is in stock
      if (!variation.item_variation_data.location_overrides?.[0]?.sold_out) {
        console.log('color in stock and being pushed to inStockItems.. color is:', variation.item_variation_data.name);
        this.inStockItems.push(variation.id);
        // console.log(this.inStockItems);
      }
    }

    // If there are no variations in stock, set this.inStock to false
    if (this.inStockItems.length === 0) {
      this.inStock = false;
    }
  }

  getStockCount(ids: string[]): void {

    console.log('in getStockCount method. current ids checked: ', ids);

    // Call the `getInventory` method with the `ids` array as an argument
    this.squareService.getInventory(ids).subscribe(
      // (response) => {
      (response: { counts?: { catalog_object_id: string; quantity: number }[] }) => {

        // Initialize a map to store catalog_object_id: quantity pairs
        const stockMap: { [key: string]: number } = {}; // Type annotations added here

        // Check if the response has the "counts" property
        if (response.counts) {
          // Loop through the "counts" array in the API response
          response.counts.forEach((countItem: any) => {
          // Create a map entry with catalog_object_id as the key and quantity as the value
          stockMap[countItem.catalog_object_id] = countItem.quantity;
          });
        }
        // Store the response in the stockMap
        this.stockMap = stockMap;
        // Now you can work with the stockMap as needed
        console.log(`in getStockCount method: this.stockMap: ${this.stockMap}`);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }

  formatPrice(price: number): string {
    // Divide the price by 100 to convert it to dollars
    const dollars = price / 100;
    // Format the price with two decimal places and add the "$" symbol
    return `$${dollars}`;
  }

    //this is fucked need to think through references
    //logic for next and previous requires referencing the currentImageIndex.. so bubble clicks will needs to update the currentImageIndex to retain function
   chooseImage(id: string) {
    this.currentImage = this.imageMap[id];
    console.log(`fired choseImage.. ${this.currentImage}, ${this.currentImageIndex}`)
   }

   //handles events when bubble is clicked for image selection in single view
   selectBubble(index: number): void {
    this.currentImageIndex = index; // Update the selected index
    this.isBubbleSelected = true; // Enable the class on the selected bubble
  }

  //color selector bubble handler
  selectColor(variantIndex: number): void {
    this.currentColorIndex = variantIndex;
    this.colorIsSelected = true;
    this.quantity = 1; //zero out to avoid over-ordering issues
    //only display images from current color
    if (this.itemEnlarged.item_data.variations[variantIndex].item_variation_data.image_ids) {
      this.itemEnlarged.item_data.image_ids = this.itemEnlarged.item_data.variations[variantIndex].item_variation_data.image_ids;
      this.currentImageIndex = 0; //reset so first image with color match is first image to appear
      this.currentImage = this.imageMap[this.itemEnlarged.item_data.image_ids[0]]; //reset displayed image to first in new image_ids array
    }
    //remove selectors by setting out of stock if item has no stock
    if (this.itemEnlarged.item_data.variations[variantIndex].item_variation_data.location_overrides?.[0]?.sold_out) {
      this.inStock = false;
    } else {
      this.inStock = true;
    }
  }

  //handles styling changes on out of stock color variant
  isSoldOut(variation: any): boolean {
    // Check if the item is sold out
    return variation.item_variation_data.location_overrides?.[0]?.sold_out === true;
  }

  incrementQuantity(): void {

    //if the the item has stock quanitites location_overrides exists, else increment
    if (this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.location_overrides) {
      //if location over_rides exists implies stock so check quantities attained from checkStock() through stockMap
      if (this.quantity < this.stockMap[this.itemEnlarged.item_data.variations[this.currentColorIndex].id]) {
        this.quantity = this.quantity + 1;
        this.subTotal = this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.price_money.amount * this.quantity;
      }
    } else {
      this.quantity = this.quantity + 1;
      this.subTotal = this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.price_money.amount * this.quantity;
    }
    // console.log(this.quantity);
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
      this.subTotal = this.subTotal - this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.price_money.amount;
    }
  }

  addToCart(): void {

    //get relevant id to stock count.. if no colors then variant 0
    let imageLink: string = '';
    if (this.imageMap[this.itemEnlarged.item_data.image_ids]) {
      imageLink = this.imageMap[this.itemEnlarged.item_data.image_ids[0]];
    }

    const cartItem: any = {
      name: this.itemEnlarged.item_data.name,
      price: this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.price_money.amount,
      color: this.itemEnlarged.item_data.variations[this.currentColorIndex].item_variation_data.name,
      // imageUrl: this.imageMap[this.itemEnlarged.item_data.image_ids[0]],
      //TESTING
      imageUrl: imageLink,
      id: this.itemEnlarged.id,
      variant: this.currentColorId,
      quantity: this.quantity,
      limit: Number(this.stockMap[this.currentColorId])
    }

    console.log(cartItem);

    const cart: any[] = this.cacheService.getCart();

    //test for variable match in loop
    let itemAlreadyInCart = false;
    //add item quantity if variant match for later testing?
    let oldQuantity = 0;

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];

      if (item.variant === cartItem.variant) {
        itemAlreadyInCart = true;
        oldQuantity = item.quantity;

        if (cartItem.quantity > oldQuantity) {
          // Remove old cart item from cart variable
          console.log('larger quantity detected. Removing old item and adding new to saved variable')
          cart.splice(i, 1);
          cart.push(cartItem);
        }

        break;
      }
    }


    if (itemAlreadyInCart) {
      console.log('Item already exists in the cart:');
      //check for new quantity and if great than previous quantity then update cart via this.cacheService.updateCart()
      if(cartItem.quantity > oldQuantity) {
        //you already updated and changed the cached cart saved to variable. Now update cart in cache.
        console.log('new quantity is greater than the old one.. updating with new quanity')
        this.cacheService.updateCart(cart);
      }

      this.router.navigate(['/cart']);
    } else {
      this.cacheService.addToCart(cartItem);
      console.log('this item could be added to the cart');
      this.router.navigate(['/cart']);
    }
  }

}
