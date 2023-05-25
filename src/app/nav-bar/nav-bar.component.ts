import { Component, AfterViewInit, Inject } from '@angular/core'; //imported HostListener for clicking out of menu event
import { SharedService } from '../shared.service';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements AfterViewInit {

  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';
  // navIsOpen: boolean = false;

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

  ngAfterViewInit() {
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.add('slide-in-animation');
    }
  }


}


