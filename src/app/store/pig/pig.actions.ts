import { createAction, props } from '@ngrx/store';
import { PigStatus } from "../../models/pig.model";

export const loadPigStatus = createAction('[Pig Status] Load Status');
export const loadPigStatusSuccess = createAction(
  '[Pig] Load Pig Status Success',
  props<{ status: PigStatus }>() 
);
export const loadPigStatusFailure = createAction(
  '[Pig Status] Load Status Failure',
  props<{ error: string }>()
);

export const updatePigStatus = createAction(
  '[Pig Status] Update Status',
  props<{ newStatus: string }>()
);
export const updatePigStatusSuccess = createAction(
  '[Pig Status] Update Status Success',
  props<{ status: PigStatus }>()
);
export const updatePigStatusFailure = createAction(
  '[Pig Status] Update Status Failure',
  props<{ error: string }>()
);
