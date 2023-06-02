import {Expose} from 'class-transformer';

export default class UserRdo {
  @Expose()
  public userName!: string;

  @Expose()
  public email!: string ;
}
