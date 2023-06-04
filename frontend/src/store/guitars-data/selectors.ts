import { createSelector } from '@reduxjs/toolkit';
import { State, GuitarsState } from '../../types/state';
import { NameSpace } from '../../const';

export const getGuitars = createSelector(
  (state: State) => state[NameSpace.Guitars],
  (state: GuitarsState) => state.guitars
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Guitars],
  (state: GuitarsState) => state.isLoading
);
