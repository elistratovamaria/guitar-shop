import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { GuitarState } from '../../types/state';
import { addGuitar, deleteGuitar, editGuitar, fetchGuitar } from '../api-actions';

const initialState: GuitarState = {
  guitar: null,
  isLoading: false,
};

export const guitarData = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGuitar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuitar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guitar = action.payload;
      })
      .addCase(fetchGuitar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addGuitar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGuitar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guitar = action.payload;
      })
      .addCase(addGuitar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editGuitar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGuitar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guitar = action.payload;
      })
      .addCase(editGuitar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteGuitar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGuitar.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedGuitar = action.payload;
        if (deletedGuitar.id === state.guitar?.id) {
          state.guitar = null;
        }
      })
      .addCase(deleteGuitar.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
