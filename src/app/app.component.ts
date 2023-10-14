import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { SquareService } from './square/square.service';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public sharedService: SharedService, private squareService: SquareService) {}

  title = 'Else Werner Glass';
  dataReady: boolean = false;

  ngOnInit(): void {
    this.squareService.getCatalogue().subscribe(() => {
      // Data is fetched and cached successfully
      this.dataReady = true;
      console.log(`appComponent init done. data ready: ${this.dataReady}`)
    });
    this.squareService.getImages().subscribe(data=> {
      console.log(`images from appComponent ${data}`)
    })
  }

  closeNav(): void {
    if (this.sharedService.navIsOpen) {
      this.sharedService.toggleNavIsOpen();
    }
  }
}
