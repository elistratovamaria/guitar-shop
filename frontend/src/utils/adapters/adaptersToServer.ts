import CreateGuitarDto from '../../dto/guitar/create-guitar.dto';
import UpdateGuitarDto from '../../dto/guitar/update-guitar.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import UserDto from '../../dto/user/user.dto';
import { Guitar } from '../../types/guitar';
import { NewGuitar } from '../../types/new-guitar';
import { NewUser } from '../../types/new-user';
import { User } from '../../types/user';
import { getTime } from '../utils';

export const adaptSignupToServer = (user: NewUser): CreateUserDto => ({
  userName: user.userName,
  email: user.email,
  password: user.password,
  isAdmin: user.isAdmin
});

export const adaptUserToServer = (user: User): UserDto => ({
  userName: user.userName,
  email: user.email,
  isAdmin: user.isAdmin
});

export const adaptCreateGuitarToServer = (guitar: NewGuitar): CreateGuitarDto => ({
  name: guitar.name,
  description: guitar.description,
  postDate: getTime(),
  image: guitar.image,
  guitarType: guitar.guitarType,
  articleNumber: guitar.articleNumber,
  stringAmount: guitar.stringAmount,
  price: guitar.price
});

export const adaptEditGuitarToServer = (guitar: Guitar): UpdateGuitarDto => ({
  name: guitar.name,
  description: guitar.description,
  image: guitar.image,
  guitarType: guitar.guitarType,
  articleNumber: guitar.articleNumber,
  stringAmount: guitar.stringAmount,
  price: guitar.price
});

export const adaptImageToServer = (file: string) => {
  const formData = new FormData();
  formData.set('image', file);

  return formData;
};
