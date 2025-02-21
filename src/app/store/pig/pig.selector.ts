import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PigStatusState } from './pig.reducer';

// ✅ Ensure this matches the feature key in app.config.ts
export const pigFeatureKey = 'pigStatus';

// ✅ Fix the feature selector to match the key
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
