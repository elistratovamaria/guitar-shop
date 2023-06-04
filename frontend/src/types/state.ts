import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Guitar } from './guitar.js';
import { User } from './user.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type GuitarsState = {
  guitars: Guitar[];
  isLoading: boolean;
};

export type GuitarState = {
  guitar: Guitar | null;
  isLoading: boolean;
};
