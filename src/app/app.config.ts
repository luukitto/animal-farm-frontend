import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from "@ngrx/store";
import { animalReducer } from "./store/animal/animal.reducer";
import { provideEffects } from "@ngrx/effects";
import { AnimalEffects } from "./store/animal/animal.affects";
import { provideAnimations } from "@angular/platform-browser/animations";
import { pigStatusReducer } from "./store/pig/pig.reducer";
import { PigStatusEffects } from "./store/pig/pig.affects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      animal: animalReducer,
      pigStatus: pigStatusReducer
    }),
    provideEffects([AnimalEffects, PigStatusEffects]),
    provideHttpClient(),
    provideAnimations()
  ]
};
