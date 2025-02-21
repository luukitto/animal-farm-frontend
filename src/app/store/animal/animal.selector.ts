import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalState } from './animal.reducer';

export const selectAnimalState = createFeatureSelector<AnimalState>('animal');

export const selectAllAnimals = createSelector(
  selectAnimalState,
  state => state.animals
);

export const selectLoading = createSelector(
  selectAnimalState,
  state => state.loading
);

export const selectError = createSelector(
  selectAnimalState,
  state => state.error
);
