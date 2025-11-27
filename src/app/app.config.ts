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
    provideFirebaseApp(() => initializeApp(environment.firebase)),provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "municipal-lab3", appId: "1:438317422362:web:89053e14307e4d31eabea3", storageBucket: "municipal-lab3.firebasestorage.app", apiKey: "AIzaSyBJanFvcV74feGC7Indcbhy_nLMMfmUylI", authDomain: "municipal-lab3.firebaseapp.com", messagingSenderId: "438317422362", measurementId: "G-Q7F20R61RR" })), provideFirestore(() => getFirestore())
  ]
};
