import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "municipal-disaster-respo-ac5c6", appId: "1:57725791916:web:cde3eee0d6e89fe07af909", storageBucket: "municipal-disaster-respo-ac5c6.firebasestorage.app", apiKey: "AIzaSyCYNuo7nqj71bYBticuVlBSyUVMkm2y-fo", authDomain: "municipal-disaster-respo-ac5c6.firebaseapp.com", messagingSenderId: "57725791916", measurementId: "G-HYXNHYVR3P"})), provideFirestore(() => getFirestore())
  ]
};
