import { Component, OnInit } from '@angular/core';
import { SquareService } from '../square/square.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  currentImageIndex: number = 0; //used to toggle via item_data.image_ids array
  isBubbleSelected: boolean = false; // handle styling on bubble selected

  inStock: boolean = true;
  stockMap: any = {}; //populate with stock counts for item purchase limiting

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
  currentColorIndex: number = 0;

  quantity: number = 1;

  inStockItems: string[] = [];

  constructor(private route: ActivatedRoute, private squareService: SquareService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // save route parameter id for item match
      const itemId = params.get('id');
      this.id = itemId;
    });

    //call square getCatalogue to get loop match for item id, populate imageMap
    this.fetchCatalogData();

    console.log(this.itemEnlarged);

    //check if item in stock
    this.checkStock();

    if(this.inStock) {
      this.getStockCount();
    }
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
        this.currentImage = this.imageMap[this.itemEnlarged.item_data.image_ids[0]]; //initiate viewable image in item as first image id in array
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
      //item is in stock or has variants.. maybe need to do some else ifs... want to do the loop through to test all variants absolutely last somehow
      console.log(`in stock: sold out?: ${this.itemEnlarged.item_data.variations[0].item_variation_data.location_overrides?.[0]?.sold_out}, name: ${this.itemEnlarged.item_data.variations[0].item_variation_data.name}`);
    }
     // If the 'Regular' variant is not out of stock and it's the first variant return in stock and break method
     if (this.itemEnlarged.item_data.variations[0].item_variation_data.name === 'Regular') {
      // this.inStock = true;
      return
    }

    //Item has variants: loop through and push and in stock items to inStockArray for inventory check
    for (let i = 0; i < this.itemEnlarged.item_data.variations.length; i++) {
      const variation = this.itemEnlarged.item_data.variations[i];
      // if variant is in stock
      if (!variation.item_variation_data.location_overrides?.[0]?.sold_out) {
        this.inStockItems.push(variation.id);
      }
    }

    // If there are no variations in stock, set this.inStock to false
  if (this.inStockItems.length === 0) {
    this.inStock = false;
  }
  }

  getStockCount(): void {
    const ids: string[] = [];

    // Loop through the variations and push their IDs to the `ids` array
    this.itemEnlarged.item_data.variations.forEach((variation: any) => {
      ids.push(variation.id);
    });

    console.log(`ids array before request: ${ids}`);

    // Call the `getInventory` method with the `ids` array as an argument
    this.squareService.getInventory(ids).subscribe(
      (response) => {

          // Initialize a map to store catalog_object_id: quantity pairs
          const stockMap: { [key: string]: number } = {}; // Type annotations added here

        // Loop through the "counts" array in the API response
        response.counts.forEach((countItem: any) => {
        // Create a map entry with catalog_object_id as the key and quantity as the value
        stockMap[countItem.catalog_object_id] = countItem.quantity;
        });
        // Store the response in the stockMap
        this.stockMap = stockMap;
        // Now you can work with the stockMap as needed
        console.log(this.stockMap);
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

  // itemIsStocked(): boolean {
  //   if (this.itemEnlarged.item_data.variations[0].item_variation_data.name ) {
  //     console.log('item is out of stock');
  //     return false;
  //   } else {
  //     console.log('item is in stock')
  //     return true;
  //   }
  // }

  selectColor(variantIndex: number): void {
    this.currentColorIndex = variantIndex;
    this.colorIsSelected = true;
    this.quantity = 0; //zero out to avoid over-ordering issues
  }

  incrementQuantity(): void {
    //Selecting a color changes this.currentColorIndex so limits based on selected color
    if (this.quantity < this.stockMap[this.itemEnlarged.item_data.variations[this.currentColorIndex].id]) {
      this.quantity = this.quantity + 1;
    }
  }

  decrementQuantity(): void {
    this.quantity = this.quantity - 1;
  }

}
