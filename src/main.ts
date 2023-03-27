import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';
import {enableProdMode} from "@angular/core";

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfVtdX2BWfFN0RnNedVt0flVOcC0sT3RfQF5jSnxVd0BgWXpfdnZSRg==');

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
