import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from './cacheservice.service';
export const CachingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: import('@angular/common/http').HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cacheService = inject(RequestCacheService);

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cacheService.get(req.urlWithParams);


  if (cachedResponse) {

    return of(cachedResponse.clone());
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {

        cacheService.put(req.urlWithParams, event.clone());
      }
    })
  );
};