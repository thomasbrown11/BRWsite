import { Component, AfterViewInit, Inject } from '@angular/core'; //imported HostListener for clicking out of menu event

//animation handling
import { trigger, state, style, animate, transition } from '@angular/animations';


//shared variable for toggling
import { SharedService } from '../shared.service';


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

export class NavBarComponent implements AfterViewInit {

  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';
  // shopToggle: boolean = false;
  isMouseOver: Boolean = false;
  // navIsOpen: boolean = false;
  menuItems: string[] = ['hello','there'];

  constructor(public sharedService: SharedService) { }

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


