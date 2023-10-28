import { Component, OnInit } from '@angular/core';
import { SquareService } from './square.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  id: string | null = ''; //id pulled from the link route parameter
  categoryName: string | null = ''; //populate category name for display
  saleItems: any[] = []; //pulls square cache or api response and populates all items filtered by category id
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

  constructor(private route: ActivatedRoute, private squareService: SquareService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Get the 'category' parameter and parse it back to an object
      const categoryId = params.get('id');
      this.id = categoryId;
    });

    this.fetchCatalogData();

    console.log(this.categoryName);
    console.log(this.saleItems);

  }

  fetchCatalogData() {
    this.squareService.getCatalogue().subscribe(data => {
      // Find the category in the data array that matches the ID from the URL
      const matchedCategory = data.categories.find((category: any) => category.id === this.id);

      if (matchedCategory) {
        this.categoryName = matchedCategory.category_data.name;

        // Filter items based on category
        this.saleItems = data.items.filter((item: any) => item.item_data.category_id === this.id);
      } else {
        this.categoryName = 'Shop'; // Display 'Shop' if no category selected
        this.saleItems = data.items;
      }

      this.squareService.getImages().subscribe(data => {
        this.imageMap = data;
      });
    });
  }

  formatPrice(price: number): string {
    // Divide the price by 100 to convert it to dollars
    const dollars = price / 100;

    // Format the price with two decimal places and add the "$" symbol
    return `$${dollars}`;
  }


  isRegularVariantOutOfStock(item: any) {
    // Check if the 'Regular' variant is out of stock ie there are no color variants added, skipping variant testing
    const isRegularOutOfStock =
      item.item_data.variations[0].item_variation_data.location_overrides?.[0]?.sold_out === true &&
      item.item_data.variations[0].item_variation_data.name === 'Regular';

      // If the 'Regular' variant is not out of stock and it's the first variant, return true immediately since no color variants
    if (!isRegularOutOfStock && item.item_data.variations[0].item_variation_data.name === 'Regular') {
      return false;
    }

      if (!isRegularOutOfStock) {
        // Loop through color variants starting from index 1
        for (let i = 0; i < item.item_data.variations.length; i++) {
          const variation = item.item_data.variations[i];
          // Check if this color variant is in stock
          if (!variation.item_variation_data.location_overrides?.[0]?.sold_out) {
            return false; // At least one color variant is in stock, so return false
          }
        }
      }

      return true; // All color variants are out of stock
    }

  //probably no longer need any of these items...

    //added to toggle to single item view
    toggleImageEnlarged(item: any) {
      console.log('Toggle image:', item);
      // console.log('carouselIndex', this.carouselIndex)
      if (this.itemEnlarged === item) {
        this.itemEnlarged = null; //close single item view
        this.currentImage = null; //clear image from carousel
        this.currentImageIndex = 0; //clear out any toggled index values
      } else {
        this.itemEnlarged = item; //update current single item.. triggers ngIf
        this.currentImage = this.imageMap[this.itemEnlarged.item_data.image_ids[0]]; //initiate viewable image in item as first image id in array
        console.log(`itemEnlarged toggled... instantiating current image as ${this.currentImage}.. index is ${this.currentImageIndex}`)
      }
      console.log('Image enlarged:', this.itemEnlarged);
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

  selectColor(variantIndex: number): void {
    this.currentColorIndex = variantIndex;
    this.colorIsSelected = true;
  }
}
