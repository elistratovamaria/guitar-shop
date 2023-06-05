import { IsDateString, IsEnum, IsInt, Max, Length, Min, IsOptional } from 'class-validator';
import { GuitarType } from '../../../types/guitar-type.enum.js';
import { StringAmount } from '../../../types/string-amount.enum.js';
import { guitarValidationMessages, nameLength, descriptionLength, priceValue, articleLength } from '../guitar.constant.js';

export default class CreateGuitarDto {
  @Length(nameLength.MIN, nameLength.MAX, { message: guitarValidationMessages.NAME })
  public name!: string;

  @Length(descriptionLength.MIN, descriptionLength.MAX, { message: guitarValidationMessages.DESCRIPTION })
  public description!: string;

  @IsOptional()
  @IsDateString({}, { message: guitarValidationMessages.POSTDATE })
  public postDate!: Date;

  @IsEnum(GuitarType, { message: guitarValidationMessages.GUITAR_TYPE })
  public guitarType!: GuitarType;

  @Length(articleLength.MIN, articleLength.MAX, { message: guitarValidationMessages.ARTICLE_NUMBER })
  public articleNumber!: string;

  @IsEnum(StringAmount, { message: guitarValidationMessages.STRING_AMOUNT })
  public stringAmount!: StringAmount;

  @IsInt({ message: guitarValidationMessages.PRICE })
  @Min(priceValue.MIN, { message: guitarValidationMessages.PRICE_MIN })
  @Max(priceValue.MAX, { message: guitarValidationMessages.PRICE_MAX })
  public price!: number;
}
