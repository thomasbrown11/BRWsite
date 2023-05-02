// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class InstagramCacheService {

//   private cachedImages: any[] | null = null;
//   private cachedAfterCursor: string | null = null;

//   constructor() { }

//   getImages(): any[] | null {
//     return this.cachedImages;
//   }

//   getAfterCursor(): string | null {
//     return this.cachedAfterCursor;
//   }

//   cacheImages(images: any[]) {
//     this.cachedImages = images;
//   }

//   cacheAfterCursor(cursor: string) {
//     this.cachedAfterCursor = cursor;
//   }


//   clear(): void {
//     this.cachedImages = [];
//     this.cachedAfterCursor = '';
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramCacheService {

  private readonly imagesKey = 'cachedImages';
  private readonly afterCursorKey = 'cachedAfterCursor';

  constructor() { }

  getImages(): any[] | null {
    const cachedImages = localStorage.getItem(this.imagesKey);
    return cachedImages ? JSON.parse(cachedImages) : null;
  }

  getAfterCursor(): string | null {
    return localStorage.getItem(this.afterCursorKey);
  }

  cacheImages(images: any[]) {
    localStorage.setItem(this.imagesKey, JSON.stringify(images));
  }

  cacheAfterCursor(cursor: string) {
    localStorage.setItem(this.afterCursorKey, cursor);
  }

  clear(): void {
    localStorage.removeItem(this.imagesKey);
    localStorage.removeItem(this.afterCursorKey);
  }
}
