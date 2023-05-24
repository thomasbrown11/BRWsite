import { Component } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  navIconSrc = '../../assets/hamburger-menu.png';
  instaLink = 'https://www.instagram.com/elsewernerglass/';
  instaIcon = '../../assets/Instagram_Glyph_Black.png';

  constructor(public sharedService: SharedService) { }

  toggleNav() {
    this.sharedService.toggleNavIsOpen()
    console.log(`navIsOpen: ${this.sharedService.navIsOpen}`);
    this.navIconSrc = this.sharedService.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
    const container = document.querySelector('.nav-links-container') as HTMLElement;
    if (container) {
      container.classList.remove('slide-in-animation');
      void container.offsetWidth; // Trigger reflow
      container.classList.add('slide-in-animation');
    }
  }
}
