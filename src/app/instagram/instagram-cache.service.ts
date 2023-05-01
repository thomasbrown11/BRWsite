import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramCacheService {

  private cache: { [key: string]: any } = {};

  constructor() { }

  get(key: string): any {
    return this.cache[key];
  }

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  clear(): void {
    this.cache = {};
  }
}