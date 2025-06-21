import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from './cacheservice.service';

@Injectable()
export class CachingInterceptorService implements HttpInterceptor {
  constructor(private cacheService: RequestCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check cache for a cached response
    const cachedResponse = this.cacheService.get(req.urlWithParams);
    if (cachedResponse ) {
      // Return cached response as observable
      return of(cachedResponse.clone());
    }

    // No cached response, send request to server
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Cache the response
          this.cacheService.put(req.urlWithParams, event.clone());
        }
      })
    );
  }
}
