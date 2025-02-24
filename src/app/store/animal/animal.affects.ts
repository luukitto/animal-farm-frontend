import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AnimalService } from '../../services/animal.service';
import * as AnimalActions from './animal.actions';

@Injectable()
export class AnimalEffects {
  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.loadAnimals),
      switchMap(({ page, search }) =>
        this.animalService.getAllAnimals(page, search).pipe(
          map(response => AnimalActions.loadAnimalsSuccess({ 
            animals: response.items,
            meta: response.meta 
          })),
          catchError(error => of(AnimalActions.loadAnimalsFailure({ error })))
        )
      )
    )
  );

  feedAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.feedAnimal),
      switchMap(({ id }) =>
        this.animalService.feedAnimal(id).pipe(
          map(animal => AnimalActions.feedAnimalSuccess({ animal })),
          catchError(error => of(AnimalActions.feedAnimalFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private animalService: AnimalService
  ) {}
} 