import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AnimalService } from '../../services/animal.service';
import * as AnimalActions from './animal.actions';

@Injectable()
export class AnimalEffects {
  loadAnimals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimalActions.loadAnimals),
      switchMap(({ page = 1, limit = 10 }) =>
        this.animalService.getAnimals(page, limit).pipe(
          map(animals => AnimalActions.loadAnimalsSuccess({ animals })),
          catchError(error => of(AnimalActions.loadAnimalsFailure({ error: error.message })))
        )
      )
    );
  });



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
