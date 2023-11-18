import { Component, AfterViewInit, OnInit} from '@angular/core'; //imported HostListener for clicking out of menu event
//animation handling
import { trigger, state, style, animate, transition } from '@angular/animations';
//shared variable for toggling
import { SharedService } from '../shared.service';
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
  isMouseOver: Boolean = false;
  squareCategories: any[] = [];

  constructor(public sharedService: SharedService, private cacheService: CacheService) {}

  ngOnInit(): void {

    this.squareCategories = this.cacheService.getSquareCache().categories

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


