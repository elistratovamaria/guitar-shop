import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { Guitar } from '../../types/guitar.type.js';
import { StringAmount } from '../../types/string-amount.enum.js';

const { prop, modelOptions } = typegoose;

export interface GuitarEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'guitars'
  }
})
export class GuitarEntity extends defaultClasses.TimeStamps implements Guitar {
  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({default: ''})
  public image!: string;

  @prop({
    type: () => String,
    enum: GuitarType,
    required: true
  })
  public guitarType!: GuitarType;

  @prop({required: true})
  public articleNumber!: string;

  @prop({
    type: () => Number,
    enum: StringAmount,
    required: true
  })
  public stringAmount!: StringAmount;

  @prop({required: true})
  public price!: number;
}

export const GuitarModel = getModelForClass(GuitarEntity);
