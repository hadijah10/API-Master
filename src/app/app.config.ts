import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './services/caching-interceptor.service';
import { routes } from './app.routes';
import { Authinterceptor } from './interceptors/authinterceptor';
import { RequestCacheService } from './services/cacheservice.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([Authinterceptor,CachingInterceptor])),

  ],
    
};
