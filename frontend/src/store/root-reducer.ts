import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarData } from './guitar-data/guitar-data';
import { userData } from './user-data/user-data';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitarsData.reducer,
  [NameSpace.Guitar]: guitarData.reducer,
  [NameSpace.User]: userData.reducer,
});
