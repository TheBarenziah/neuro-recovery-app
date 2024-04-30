import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideDatabase } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB8TpQ_57M_c8UF-B4K_c5dZcNoCgHESKE",
  authDomain: "neurorecoveryapp.firebaseapp.com",
  databaseURL: "https://neurorecoveryapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "neurorecoveryapp",
  storageBucket: "neurorecoveryapp.appspot.com",
  messagingSenderId: "796895451224",
  appId: "1:796895451224:web:38a8fedf1567e3f53dd22d",
  measurementId: "G-F3637MTJTR"
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(withFetch()),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase())

    ])
  ]
};
