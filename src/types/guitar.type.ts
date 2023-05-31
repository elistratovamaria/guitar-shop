import { GuitarType } from './guitar-type.enum.js';
import { StringAmount } from './string-amount.enum.js';

export type Guitar = {
  name: string;
  description: string;
  postDate: Date;
  image: string;
  guitarType: GuitarType;
  articleNumber: string;
  stringAmount: StringAmount;
  price: number;
}
