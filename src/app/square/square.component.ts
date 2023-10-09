import { Component, OnInit } from '@angular/core';
import { SquareService } from './square.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  id: string | null = '';
  saleItems: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Get the value of the 'id' parameter
      const categoryId = params.get('id');
      this.id = categoryId;
    });
  }
}
