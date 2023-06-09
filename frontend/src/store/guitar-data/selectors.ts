import { createSelector } from '@reduxjs/toolkit';
import { State, GuitarState } from '../../types/state';
import { NameSpace } from '../../const';

export const getActiveGuitar = createSelector(
  (state: State) => state[NameSpace.Guitar],
  (state: GuitarState) => state.guitar
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Guitar],
  (state: GuitarState) => state.isLoading
);
