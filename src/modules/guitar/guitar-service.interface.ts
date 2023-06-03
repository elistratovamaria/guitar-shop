import { DocumentType } from '@typegoose/typegoose';
import { GuitarEntity } from './guitar.entity.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import UpdateGuitarDto from './dto/update-guitar.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { SortType } from '../../types/sort-type.enum.js';

export interface GuitarServiceInterface extends DocumentExistsInterface {
  create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>>;
  findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  find(sortType?: SortType): Promise<DocumentType<GuitarEntity>[]>;
  deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  updateById(guitarId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null>;
}
