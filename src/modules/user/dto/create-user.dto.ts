import { IsEmail, Length } from 'class-validator';
import { userValidationMessages, userNameLength, passwordLength } from '../user.constant.js';

export default class CreateUserDto {
  @Length(userNameLength.MIN, userNameLength.MAX, { message: userValidationMessages.USER_NAME })
  public userName!: string;

  @IsEmail({}, { message: userValidationMessages.EMAIL })
  public email!: string;

  @Length(passwordLength.MIN, passwordLength.MAX, { message: userValidationMessages.PASSWORD })
  public password!: string;

  public isAdmin?: boolean;
}
