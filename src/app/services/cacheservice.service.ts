import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import {CacheEntry} from '../models/interfaces/cachemodel'

const MAX_CACHE_AGE = 300000; // Cache duration in milliseconds (e.g., 5 minutes)

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService {
  private cache = new Map<string, CacheEntry>();

  get(url: string): HttpResponse<any> | null {
    const cached = this.cache.get(url);

    if (!cached) {
      return null;
    }

    const isExpired = (Date.now() - cached.entryTime) > MAX_CACHE_AGE;  // Cache duration in milliseconds (e.g., 5 minutes)
    if (isExpired) {
      this.cache.delete(url);
      return null;
    }
    console.log('cache hit')
    console.log(this.cache)
    return cached.response;
  }

  put(url: string, response: HttpResponse<any>): void {
    const entry: CacheEntry = { url, response, entryTime: Date.now() };
    this.cache.set(url, entry);
    this.clearCache()
  }
  clearCache(){
        const now = Date.now();
    this.cache.forEach((entry, url) => {
      if (now - entry.entryTime > MAX_CACHE_AGE) this.cache.delete(url);
    });
  }


}
