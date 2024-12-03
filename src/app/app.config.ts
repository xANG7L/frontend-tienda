import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
    ),
    provideEnvironmentNgxMask(), provideAnimationsAsync()
  ]
};
