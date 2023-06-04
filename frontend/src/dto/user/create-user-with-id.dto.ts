export default class CreateUserWithIdDto {
  public id!: string;
  public userName!: string;
  public email!: string;
  public password!: string;
  public isAdmin?: boolean;
}
