import { DocumentType } from '@typegoose/typegoose';
import { GuitarEntity } from './guitar.entity.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';

export interface GuitarServiceInterface {
  create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>>;
  findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
}
