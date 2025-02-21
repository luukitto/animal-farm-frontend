import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, tap } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PigService } from '../../services/pig.service';
import { AudioService } from '../../services/music.service';
import * as PigStatusActions from './pig.actions';
import { PigStatusState } from './pig.reducer';

@Injectable()
export class PigStatusEffects {
  loadStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PigStatusActions.loadPigStatus),
      mergeMap(() => this.pigService.getStatus().pipe(
        tap(status => console.log('API Response:', status)),  // Debugging Log
        map(status => PigStatusActions.loadPigStatusSuccess({ status })),
        catchError(error => {
          console.error('Error fetching status:', error);
          return of(PigStatusActions.loadPigStatusFailure({ error: 'Failed to get status' }));
        })
      ))
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PigStatusActions.updatePigStatus),
      mergeMap(({ newStatus }) =>
        this.pigService.updateStatus(newStatus).pipe(
          map(status => PigStatusActions.updatePigStatusSuccess({ status })),
          catchError(() => of(PigStatusActions.updatePigStatusFailure({
            error: 'Failed to update pig status. Please try again.'
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ pigStatus: PigStatusState }>, // ✅ Ensuring proper state typing
    private pigService: PigService,
    private audioService: AudioService
  ) {}
}
