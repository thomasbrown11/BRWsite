import { Component, AfterViewInit, Inject, OnInit } from '@angular/core'; //imported HostListener for clicking out of menu event

//animation handling
import { trigger, state, style, animate, transition } from '@angular/animations';


//shared variable for toggling
import { SquareService } from '../square/square.service';
import { SharedService } from '../shared.service';
import { share } from 'rxjs';
import { CacheService } from '../cache.service';


/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  //animations
  animations: [
    trigger('inFromLeft', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition('void <=> *', animate('.3s'))
    ])
  ]
})

export class NavBarComponent implements AfterViewInit, OnInit {

  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';
  // shopToggle: boolean = false;
  isMouseOver: Boolean = false;
  // navIsOpen: boolean = false;

  squareCategories: any[] = [];
  menuItems: string[] = ['hello','there'];

  constructor(public sharedService: SharedService, private squareService: SquareService, private cacheService: CacheService) { }

  ngOnInit(): void {
    // this.squareService.getCatalogue().subscribe(data => {
    //   this.squareCategories = data.categories;
    // })
    // this.squareService.getImages();
    // let categories = this.cacheService.getSquareCache().categories;
    // for (let i of categories) {
    //   this.squareCategories.push(i.category_data.name);
    // }
    // console.log(this.squareCategories)
    this.squareCategories = this.cacheService.getSquareCache().categories;

  }

  toggleNav() {
    // this.isOpen = !this.isOpen;
    this.sharedService.toggleNavIsOpen(); // toggle shared variable
    console.log(`toggled from nav-bar: ${this.sharedService.navIsOpen} `)

    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.remove('slide-in-animation');
      void container.offsetWidth; // Trigger reflow
      container.classList.add('slide-in-animation');
    }


  }

  // toggleShopDropdown(event: MouseEvent): void {
  //   event.preventDefault();
  //   this.shopToggle = !this.shopToggle;
  // }

  showDropdown(): void {
    this.isMouseOver = true;
  }

  hideDropdown(): void {
    this.isMouseOver = false;
  }

  ngAfterViewInit() {
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.add('slide-in-animation');
    }
  }


}


