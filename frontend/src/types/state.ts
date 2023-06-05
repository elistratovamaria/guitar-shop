import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Guitar } from './guitar';
import { User } from './user';

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
