import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramCacheService {

  private carouselCache: { [id: string]: any } = {};

  constructor() { }

  get(id: string): any {
    return this.carouselCache[id];
  }

  set(id: string, value: any): void {
    this.carouselCache[id] = value;
  }

  clear(): void {
    this.carouselCache = {};
  }
}
