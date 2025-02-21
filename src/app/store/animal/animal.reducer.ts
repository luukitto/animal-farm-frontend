import { createReducer, on } from '@ngrx/store';
import { Animal } from '../../models/animal.model';
import * as AnimalActions from './animal.actions';

export interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}

export const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.loadAnimals, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AnimalActions.loadAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals,
    loading: false
  })),
  on(AnimalActions.loadAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AnimalActions.feedAnimal, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AnimalActions.feedAnimalSuccess, (state, { animal }) => ({
    ...state,
    animals: state.animals.map(a => a.id === animal.id ? animal : a),
    loading: false
  })),
  on(AnimalActions.feedAnimalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
