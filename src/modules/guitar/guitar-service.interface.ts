import { DocumentType } from '@typegoose/typegoose';
import { GuitarEntity } from './guitar.entity.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import UpdateGuitarDto from './dto/update-guitar.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { SortType } from '../../types/sort-type.enum.js';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { StringAmount } from '../../types/string-amount.enum.js';

export interface GuitarServiceInterface extends DocumentExistsInterface {
  create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>>;
  findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  find(sortType?: SortType, page?: string): Promise<DocumentType<GuitarEntity>[]>;
  findByGuitarType(sortType?: SortType, guitarType?: GuitarType, page?: string): Promise<DocumentType<GuitarEntity>[]>;
  findByStringAmount(sortType?: SortType, stringAmount?: StringAmount, page?: string): Promise<DocumentType<GuitarEntity>[]>;
  findByGuitarTypeAndStringAmount(sortType?: SortType, guitarType?: GuitarType, stringAmount?: StringAmount, page?: string): Promise<DocumentType<GuitarEntity>[]>;
  deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  updateById(guitarId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null>;
}
