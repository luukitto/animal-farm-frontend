import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AnimalService } from '../../services/animal.service';
import * as AnimalActions from './animal.actions';

@Injectable()
export class AnimalEffects {
  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.loadAnimals),
      mergeMap(() => this.animalService.getAnimals()
        .pipe(
          map(animals => AnimalActions.loadAnimalsSuccess({ animals })),
          catchError(error => of(AnimalActions.loadAnimalsFailure({ error: 'Failed to get animals. Please try again.' })))
        ))
    )
  );

  feedAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.feedAnimal),
      mergeMap(({ id }) => this.animalService.feedAnimal(id)
        .pipe(
          map(animal => AnimalActions.feedAnimalSuccess({ animal })),
          catchError(error => of(AnimalActions.feedAnimalFailure({ error: 'Failed to feed animal.' })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private animalService: AnimalService
  ) {}
}
