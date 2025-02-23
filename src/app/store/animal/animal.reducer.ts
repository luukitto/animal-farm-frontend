import { createReducer, on } from '@ngrx/store';
import { Animals } from '../../models/animal.model';
import * as AnimalActions from './animal.actions';

export interface State {
  animals: Animals
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  animals: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0
    }
  },
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
    animals: {
      ...state.animals,
      items: state.animals.items.map(a => a.id === animal.id ? animal : a)
    },
    loading: false
  })),
  on(AnimalActions.feedAnimalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
