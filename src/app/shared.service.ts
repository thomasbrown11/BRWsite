import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navIsOpen: boolean = false;

  navIconSrc = '../../assets/hamburger-menu.png';

  constructor() { }

  toggleNavIsOpen(): void {
    this.navIsOpen = !this.navIsOpen;
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
  }
}
