import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export function getBaseURL() {
  // return "http://192.168.1.180:3000"
  return "http://localhost:3004/api/"
  // return "https://2be1-2401-4900-1c2b-f2a9-680c-8079-15b-a786.ngrok-free.app/api/"

}

export function getBaseImageURL() {
  // return "http://192.168.1.180:3000"
  return "http://localhost:3004/"
  // return "https://2be1-2401-4900-1c2b-f2a9-680c-8079-15b-a786.ngrok-free.app/"
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseURL, deps: [] },
  { provide: 'BASE_IMAGE_URL', useFactory: getBaseImageURL, deps: [] }
]

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
