import GuitarDto from '../../dto/guitar/guitar.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { Guitar } from '../../types/guitar';
import { User } from '../../types/user';

export const adaptLoginToClient = (user: UserWithTokenDto): User => ({
  userName: user.userName,
  email: user.email,
  token: user.token,
  isAdmin: user.isAdmin
});

export const adaptUserToClient = (user: UserDto): User => ({
  userName: user.userName,
  email: user.email,
  isAdmin: user.isAdmin
});


export const adaptGuitarsToClient = (guitars: GuitarDto[]): Guitar[] =>
  guitars
    .map((guitar: GuitarDto) => ({
      id: guitar.id,
      name: guitar.name,
      description: guitar.description,
      postDate: guitar.postDate,
      image: guitar.image,
      guitarType: guitar.guitarType,
      articleNumber: guitar.articleNumber,
      stringAmount: guitar.stringAmount,
      price: guitar.price
    }));

export const adaptGuitarToClient = (guitar: GuitarDto): Guitar => ({
  id: guitar.id,
  name: guitar.name,
  description: guitar.description,
  postDate: guitar.postDate,
  image: guitar.image,
  guitarType: guitar.guitarType,
  articleNumber: guitar.articleNumber,
  stringAmount: guitar.stringAmount,
  price: guitar.price
});
