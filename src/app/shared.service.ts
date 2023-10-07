import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CacheService } from './cache.service';
import { SquareService } from './square/square.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navIsOpen: boolean = false;

  navIconSrc = '../../assets/hamburger-menu.png';

  constructor(private cacheService: CacheService, private squareService: SquareService) { }

  toggleNavIsOpen(): void {
    this.navIsOpen = !this.navIsOpen;
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';
  }
}
