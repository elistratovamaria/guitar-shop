import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarsState } from '../../types/state';
import { addGuitar, deleteGuitar, editGuitar, fetchGuitars } from '../api-actions';

const initialState: GuitarsState = {
  guitars: [],
  isLoading: false,
};

export const guitarsData = createSlice({
  name: NameSpace.Guitars,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGuitars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuitars.fulfilled, (state, action) => {
        state.guitars = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGuitars.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addGuitar.fulfilled, (state, action) => {
        state.guitars.push(action.payload);
      })
      .addCase(editGuitar.fulfilled, (state, action) => {
        const updatedGuitar = action.payload;
        state.guitars = state.guitars.map((guitar) =>
          guitar.id === updatedGuitar.id ? updatedGuitar : guitar
        );
      })
      .addCase(deleteGuitar.fulfilled, (state, action) => {
        state.guitars = state.guitars.filter(
          (guitar) => guitar.id !== action.payload.id
        );
      });
  },
});
