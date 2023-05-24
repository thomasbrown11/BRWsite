import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navIsOpen: boolean = false;
  constructor() { }

  updateNavIsOpen(value: boolean): void {
    this.navIsOpen = value;
  }

  toggleNavIsOpen(): void {
    this.navIsOpen = !this.navIsOpen;
  }

  getNavIsOpen(): boolean {
    return this.navIsOpen;
  }
}
