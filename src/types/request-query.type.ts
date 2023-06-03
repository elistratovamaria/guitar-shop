import { GuitarType } from './guitar-type.enum.js';
import { SortType } from './sort-type.enum.js';
import { StringAmount } from './string-amount.enum.js';

export type RequestQuery = {
  sortType?: SortType;
  guitarType?: GuitarType;
  stringAmount?: StringAmount;
  page?: string;
}
