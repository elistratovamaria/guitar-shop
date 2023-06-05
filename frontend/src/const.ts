export enum AppRoute {
  Login = '/',
  Guitars = '/guitars',
  Register = '/users/register',
  EditProduct = 'edit',
  AddProduct = '/create'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Guitars = '/guitars',
  User = '/users',
  Login = 'login',
  Register = 'register',
}

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  User = 'USER',
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201
}
