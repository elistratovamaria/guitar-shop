import { GuitarType } from '../../../types/guitar-type.enum.js';
import { StringAmount } from '../../../types/string-amount.enum.js';

export default class UpdateGuitarDto {
  public name?: string;
  public description?: string;
  public postDate?: Date;
  public image?: string;
  public guitarType?: GuitarType;
  public articleNumber?: string;
  public stringAmount?: StringAmount;
  public price?: number;
}
