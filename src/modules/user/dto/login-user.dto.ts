import { IsEmail, IsString } from 'class-validator';
import { userValidationMessages } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, { message: userValidationMessages.EMAIL })
  public email!: string;

  @IsString({ message: userValidationMessages.PASSWORD_REQUIRED })
  public password!: string;
}
