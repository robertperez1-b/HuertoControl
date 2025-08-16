import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import 'zone.js';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule) //  esto habilita HttpClient en toda la app
  ]
}).catch(err => console.error(err));
