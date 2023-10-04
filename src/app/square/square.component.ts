import { Component, OnInit } from '@angular/core';
import { SquareService } from './square.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  //array stores item from api response
  saleItems: any[] = [];

  ngOnInit(): void {

  }
}
