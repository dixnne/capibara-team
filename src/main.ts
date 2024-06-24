import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from './app/shared/loading.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './app/loading.interceptor';

appConfig.providers = [
  ...appConfig.providers,
  provideAnimations()
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
