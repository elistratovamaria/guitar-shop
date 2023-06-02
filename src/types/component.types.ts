export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  GuitarServiceInterface: Symbol.for('GuitarServiceInterface'),
  GuitarModel: Symbol.for('GuitarModel'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  UserController: Symbol.for('UserController'),
  GuitarController: Symbol.for('GuitarController'),
} as const;
