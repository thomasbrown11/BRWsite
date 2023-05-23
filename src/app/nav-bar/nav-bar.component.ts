import { Component, AfterViewInit } from '@angular/core'; //imported HostListener for clicking out of menu event
// import { trigger, state, style, transition, animate } from '@angular/animations';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translateX(0%)',
  //     })),
  //     state('out', style({
  //       transform: 'translateX(-100%)',
  //     })),
  //     transition('in => out', animate('300ms ease-out')),
  //     transition('out => in', animate('300ms ease-in')),
  //   ]),
  // ],
})

export class NavBarComponent implements AfterViewInit {
  // export class NavBarComponent {
  isOpen: boolean = false;
  navIconSrc = '../../assets/hamburger-menu.png';
  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';

  // toggleNav() {
  //   this.isOpen = !this.isOpen;
  //   //add in
  //   this.navIconSrc = this.isOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
  // }

  toggleNav() {
    this.isOpen = !this.isOpen;
    this.navIconSrc = this.isOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
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


