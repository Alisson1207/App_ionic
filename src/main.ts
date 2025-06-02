import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes  } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(IonicModule.forRoot()),
    provideRouter(appRoutes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));

