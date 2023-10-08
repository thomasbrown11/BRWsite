import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SquareService } from '../square/square.service';
import { CacheService } from '../cache.service';

import { switchMap, catchError, finalize, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private squareService : SquareService, private cacheService: CacheService, private router: Router) {}

  ngOnInit(): void {
    this.waitForCache();
  }

  async waitForCache(): Promise<void> {
    await this.squareService.getCatalogue().toPromise(); // Assuming getCatalogue() returns an Observable
    const cachedData = sessionStorage.getItem('squareCache');

    if (cachedData) {
      // Cache is available, navigate to '/home'
      console.log('cache found');
      console.log(cachedData);

      await this.delay(1000); // Add a 1-second delay
      console.log('sessionStorage after delay:', sessionStorage);

      this.router.navigateByUrl('/home');
    } else {
      // Cache is not available, wait for one second and retry
      console.log('loading.... no cache.. retrying')
      await this.delay(1000);
      this.waitForCache();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
