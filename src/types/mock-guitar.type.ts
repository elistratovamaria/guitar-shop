import { GuitarType } from './guitar-type.enum.js';

export type MockGuitar = {
  name: string;
  description: string;
  postDate?: Date;
  image: string;
  guitarType: GuitarType;
  articleNumber: string;
  stringAmount: number;
  price: number;
}
