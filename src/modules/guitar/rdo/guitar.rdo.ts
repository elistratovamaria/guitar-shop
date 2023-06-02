import { Expose } from 'class-transformer';

export default class GuitarRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public image!: string;

  @Expose()
  public guitarType!: string;

  @Expose()
  public articleNumber!: string;

  @Expose()
  public stringAmount!: number;

  @Expose()
  public price!: number;
}
