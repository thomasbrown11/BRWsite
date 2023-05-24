import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // isOpen: boolean = false;
  @Input() navIsOpen!: boolean;
  @Output() navIsOpenChange = new EventEmitter<boolean>();
  navIconSrc = '../../assets/hamburger-menu.png';
  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';

  toggleNav() {
    // this.isOpen = !this.isOpen;
    // console.log(`isOpen: ${this.isOpen}`);
    // this.navIconSrc = this.isOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
    this.navIsOpen = !this.navIsOpen;
    console.log(`navIsOpen: ${this.navIsOpen}`);
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.remove('slide-in-animation');
      void container.offsetWidth; // Trigger reflow
      container.classList.add('slide-in-animation');
    }
    this.navIsOpenChange.emit(this.navIsOpen); // Emit the updated value
  }
}
