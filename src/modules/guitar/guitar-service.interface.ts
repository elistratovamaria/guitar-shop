import { DocumentType } from '@typegoose/typegoose';
import { GuitarEntity } from './guitar.entity.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import UpdateGuitarDto from './dto/update-guitar.dto.js';

export interface GuitarServiceInterface {
  create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>>;
  findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  find(): Promise<DocumentType<GuitarEntity>[]>;
  deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  updateById(guitarId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null>;
}
