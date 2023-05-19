import { Component } from '@angular/core'; //imported HostListener for clicking out of menu event
// import { MatDrawerContainer, MatSidenav } from '@angular/material/sidenav';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isOpen: boolean = false;
  navIconSrc = '../../assets/hamburger-menu.png';

  toggleNav() {
    this.isOpen = !this.isOpen;
    //add in
    this.navIconSrc = this.isOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
  }
}


