import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core'; //imported HostListener for clicking out of menu event
// import { trigger, state, style, transition, animate } from '@angular/animations';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements AfterViewInit {
  // export class NavBarComponent {
  // isOpen: boolean = false;
  @Input() navIsOpen!: boolean;
  @Output() navIsOpenChange = new EventEmitter<boolean>();
  navIconSrc = '../../assets/hamburger-menu.png';
  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';

  toggleNav() {
    // this.isOpen = !this.isOpen;
    this.navIsOpen = !this.navIsOpen;
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.remove('slide-in-animation');
      void container.offsetWidth; // Trigger reflow
      container.classList.add('slide-in-animation');
    }
    this.navIsOpenChange.emit(this.navIsOpen); // Emit the updated value for app.component toggle
  }

  ngAfterViewInit() {
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.add('slide-in-animation');
    }
  }


}


