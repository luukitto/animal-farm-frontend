import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as AnimalState } from './animal.reducer';

export const selectAnimalState = createFeatureSelector<AnimalState>('animal');

export const selectAllAnimals = createSelector(
  selectAnimalState,
  state => state.animals.items
);

export const selectAnimalsMeta = createSelector(
  selectAnimalState,
  state => state.animals.meta
);

export const selectLoading = createSelector(
  selectAnimalState,
  state => state.loading
);

export const selectError = createSelector(
  selectAnimalState,
  state => state.error
);
