import { createReducer, on } from '@ngrx/store';
import { PigStatus } from '../../models/pig.model';
import * as PigStatusActions from './pig.actions';

export interface PigStatusState {
  pigStatus: PigStatus | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PigStatusState = {
  pigStatus: null,
  loading: false,
  error: null
};

export const pigStatusReducer = createReducer(
  initialState,
  on(PigStatusActions.loadPigStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PigStatusActions.loadPigStatusSuccess, (state, { status }) => ({
    ...state,
    pigStatus: status,
    loading: false
  })),
  on(PigStatusActions.loadPigStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(PigStatusActions.updatePigStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PigStatusActions.updatePigStatusSuccess, (state, { status }) => ({
    ...state,
    pigStatus: status,
    loading: false
  })),
  on(PigStatusActions.updatePigStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
