import { createAction, props } from '@ngrx/store';
import { Animal } from '../../models/animal.model';

export const loadAnimals = createAction(
  '[Animal] Load Animals',
  props<{
    page: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }>()
);

export const loadAnimalsSuccess = createAction(
  '[Animal] Load Animals Success',
  props<{
    animals: Animal[];
    meta: {
      total: number;
      page: number;
      limit: number;
    }
  }>()
);

export const loadAnimalsFailure = createAction(
  '[Animal] Load Animals Failure',
  props<{ error: any }>()
);

export const feedAnimal = createAction(
  '[Animal] Feed Animal',
  props<{ id: number }>()
);

export const feedAnimalSuccess = createAction(
  '[Animal] Feed Animal Success',
  props<{ animal: Animal }>()
);

export const feedAnimalFailure = createAction(
  '[Animal] Feed Animal Failure',
  props<{ error: string }>()
);
