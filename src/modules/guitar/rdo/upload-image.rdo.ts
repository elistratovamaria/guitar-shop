import { Expose } from 'class-transformer';

export default class UploadImageRdo {
  @Expose()
  public image!: string;
}
