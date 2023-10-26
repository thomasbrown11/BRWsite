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

  constructor(private route: ActivatedRoute, private squareService: SquareService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Get the 'category' parameter and parse it back to an object
      const itemId = params.get('id');
      this.id = itemId;
    });

    this.fetchCatalogData();

    console.log(this.itemEnlarged);
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

  itemIsStocked(): boolean {
    if (this.itemEnlarged.item_data.variations[0].item_variation_data.name ) {
      console.log('item is out of stock');
      return false;
    } else {
      console.log('item is in stock')
      return true;
    }
  }

  selectColor(variantIndex: number): void {
    this.currentColorIndex = variantIndex;
    this.colorIsSelected = true;
  }

  incrementQuantity(): void {
    this.quantity = this.quantity + 1;
  }

  decrementQuantity(): void {
    this.quantity = this.quantity - 1;
  }

}
