import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  public getInstagramCache(): any {
    const cachedValues = JSON.parse(sessionStorage.getItem('instagramCache') || '{}');
    return {
      images: cachedValues.images || [],
      after: cachedValues.after || '',
      timestamp: cachedValues.timestamp || 0
    };
  }

  public cacheInstagramData(data: any): void {
    const now = new Date().getTime();
    const cacheData = {
      images: data.data,
      after: data.paging.cursors.after,
      timestamp: now
    };
    sessionStorage.setItem('instagramCache', JSON.stringify(cacheData));
  }

  public getInstagramCacheSize(): number {
    const instagramCache = JSON.stringify(sessionStorage.getItem('instagramCache'));
    return new Blob([instagramCache]).size;
  }

}
