import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navIsOpen: boolean = false;

  // private navIsOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public navIsOpen$: Observable<boolean> = this.navIsOpenSubject.asObservable();

  navIconSrc = '../../assets/hamburger-menu.png';

  constructor() { }
  updateNavIsOpen(value: boolean): void {
    this.navIsOpen = value;
  }

  toggleNavIsOpen(): void {
    this.navIsOpen = !this.navIsOpen;
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
  }

  getNavIsOpen(): boolean {
    return this.navIsOpen;
  }
}
