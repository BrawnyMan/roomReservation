import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
<<<<<<< HEAD
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}
=======
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
