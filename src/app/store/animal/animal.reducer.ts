import { createReducer, on } from '@ngrx/store';
import { Animal } from '../../models/animal.model';
import * as AnimalActions from './animal.actions';

export interface AnimalState {
  animals: Animal[];
  meta: {
    total: number;
    page: number;
    limit: number;
  } | null;
  loading: boolean;
  error: any;
}

export const initialState: AnimalState = {
  animals: [],
  meta: null,
  loading: false,
  error: null
};

export const animalReducer = createReducer(
  initialState,
  
  on(AnimalActions.loadAnimals, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AnimalActions.loadAnimalsSuccess, (state, { animals, meta }) => ({
    ...state,
    animals,
    meta,
    loading: false
  })),
  
  on(AnimalActions.loadAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(AnimalActions.feedAnimalSuccess, (state, { animal }) => ({
    ...state,
    animals: state.animals.map((a: Animal) => 
      a.id === animal.id ? animal : a
    )
  }))
);
