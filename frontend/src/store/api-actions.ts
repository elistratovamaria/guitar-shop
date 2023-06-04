import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthData } from '../types/auth-data';
import { Token } from '../types/token';
import { APIRoute, NameSpace, HTTP_CODE } from '../const';
import { User } from '../types/user';
import { NewUser } from '../types/new-user';
import { dropToken, saveToken } from '../services/token';
import { adaptUserToClient, adaptGuitarsToClient, adaptGuitarToClient, adaptLoginToClient } from '../utils/adapters/adaptersToClient';
import { adaptSignupToServer, adaptCreateGuitarToServer, adaptImageToServer, adaptEditGuitarToServer } from '../utils/adapters/adaptersToServer';
import GuitarDto from '../dto/guitar/guitar.dto.js';
import UserDto from '../dto/user/user.dto.js';
import CreateUserWithIdDto from '../dto/user/create-user-with-id.dto.js';
import { Guitar, CreateGuitar } from '../types/guitar.js';

type Extra = {
  api: AxiosInstance;
};

export const fetchGuitars = createAsyncThunk<Guitar[], undefined, { extra: Extra }>(
  `${NameSpace.Guitars}/fetchGuitars`,
  async (_arg, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<GuitarDto[]>(APIRoute.Guitars);

    return adaptGuitarsToClient(data);
  }
);

export const fetchGuitar = createAsyncThunk<Guitar, string, { extra: Extra }>(
  `${NameSpace.Guitar}/fetchGuitar`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<GuitarDto>(`${APIRoute.Guitars}/${id}`);

    return adaptGuitarToClient(data);
  }
);

export const editGuitar = createAsyncThunk<Guitar, Guitar, { extra: Extra }>(
  `${NameSpace.Guitar}/editGuitar`,
  async (guitarData, { extra }) => {
    const { api } = extra;
    const postData = await api.patch<GuitarDto>(
      `${APIRoute.Guitars}/${guitarData.id}`,
      adaptEditGuitarToServer(guitarData)
    );
    if (postData.status === HTTP_CODE.OK && guitarData.imageStatus) {
      const postImageApiRoute = `${APIRoute.Guitars}/${guitarData.id}/image`;

      await api.post(postImageApiRoute, adaptImageToServer(guitarData.image), {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    }
    const {data} = postData;
    return adaptGuitarToClient(data);
  }
);

export const addGuitar = createAsyncThunk<Guitar, CreateGuitar, { extra: Extra }>(
  `${NameSpace.Guitar}/addGuitar`,
  async (guitarData, { extra }) => {
    const { api } = extra;
    const postData = await api.post<GuitarDto>(APIRoute.Guitars, adaptCreateGuitarToServer(guitarData));

    if (postData.status === HTTP_CODE.CREATED && guitarData.imageStatus) {
      const postImageApiRoute = `${APIRoute.Guitars}/${postData.data.id}/image`;

      await api.post(postImageApiRoute, adaptImageToServer(guitarData.image), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    const { data } = postData;
    return adaptGuitarToClient(data);
  }
);

export const deleteGuitar = createAsyncThunk<Guitar, string, { extra: Extra }>(
  `${NameSpace.Guitar}/deleteGuitar`,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.delete<GuitarDto>(`${APIRoute.Guitars}/${id}`);

    return adaptGuitarToClient(data);
  }
);

export const checkAuth = createAsyncThunk<User, undefined, { extra: Extra }>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra }) => {
    const { api } = extra;
    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      dropToken();
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<User, AuthData, { extra: Extra }>(
  `${NameSpace.User}/login`,
  async (authData, { extra }) => {
    const { api } = extra;

    const { data } = await api.post<UserDto & { token: Token }>(
      APIRoute.Login,
      authData
    );
    const { token } = data;
    saveToken(token);

    return adaptLoginToClient(data);
  }
);

export const logout = createAsyncThunk<void, undefined, { extra: Extra }>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const registerUser = createAsyncThunk<void, NewUser, { extra: Extra }>(
  `${NameSpace.User}/register`,
  async (userData, { extra }) => {
    const { api } = extra;
    await api.post<CreateUserWithIdDto>(APIRoute.Register, adaptSignupToServer(userData));
  }
);
