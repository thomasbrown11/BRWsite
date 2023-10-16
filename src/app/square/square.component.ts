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

  imageEnlarged: any; //controls single item view

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

    //added to toggle image enlargement
    toggleImageEnlarged(image: any) {
      console.log('Toggle image:', image);
      // console.log('carouselIndex', this.carouselIndex)
      if (this.imageEnlarged === image) {
        this.imageEnlarged = null;
      } else {
        // this.carouselIndex = 0; //set back to 0 in case multiple post click throughs
        this.imageEnlarged = image;
      }
      console.log('Image enlarged:', this.imageEnlarged);
    }
}
