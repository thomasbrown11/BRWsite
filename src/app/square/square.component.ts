import { Component, OnInit } from '@angular/core';
import { SquareService } from './square.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  id: string | null = '';
  categoryName: string | null = '';
  saleItems: any[] = [];

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

      // If a matching category is found, save its name
      if (matchedCategory) {
        this.categoryName = matchedCategory.category_data.name;
      }

      // Loop through items array to filter items that match the categoryId
      this.saleItems = data.items.filter((item: any) => item.item_data.category_id === this.id);
    });
  }

  formatPrice(price: number): string {
    // Divide the price by 100 to convert it to dollars
    const dollars = price / 100;

    // Format the price with two decimal places and add the "$" symbol
    return `$${dollars}`;
  }
}
