import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PigStatusState } from './pig.reducer';

export const pigFeatureKey = 'pigStatus';

export const selectPigFeature = createFeatureSelector<PigStatusState>(pigFeatureKey);

export const selectPigStatus = createSelector(
  selectPigFeature,
  (state) => state.pigStatus
);

export const selectPigLoading = createSelector(
  selectPigFeature,
  (state) => state.loading
);

export const selectPigError = createSelector(
  selectPigFeature,
  (state) => state.error
);
