import { Injectable } from '@angular/core';

import { CarouselImage } from './carouselProto';

@Injectable({
  providedIn: 'root'
})
export class InstagramCacheService {

  private carouselCache: { [id: string]: CarouselImage[] } = {};

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
