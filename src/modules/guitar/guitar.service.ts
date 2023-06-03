import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { DEFAULT_GUITAR_COUNT } from './guitar.constant.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import UpdateGuitarDto from './dto/update-guitar.dto.js';
import { GuitarEntity } from './guitar.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { SortDirection } from '../../types/sort-direction.enum.js';
import { SortType } from '../../types/sort-type.enum.js';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { StringAmount } from '../../types/string-amount.enum.js';

@injectable()
export default class GuitarService implements GuitarServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.GuitarModel) private readonly guitarModel: types.ModelType<GuitarEntity>
  ) { }

  public async create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>> {
    if (!dto.postDate) {
      dto.postDate = new Date();
    }
    const result = await this.guitarModel.create(dto);
    this.logger.info(`New guitar created: ${dto.name}`);

    return result;
  }

  public async findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel.findById(guitarId).exec();
  }

  public async find(sortType?: SortType, page?: string): Promise<DocumentType<GuitarEntity>[]> {
    let count: number;
    if (page) {
      count = +page > 0 ? DEFAULT_GUITAR_COUNT * (+page - 1) : 0;
    } else {
      count = 0;
    }
    if (!sortType || sortType === SortType.Date) {
      return this.guitarModel
        .find()
        .sort({postDate: SortDirection.Down})
        .skip(count)
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else if (sortType === SortType.PriceDown) {
      return this.guitarModel
        .find()
        .sort({price: SortDirection.Down})
        .skip(count)
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else {
      return this.guitarModel
        .find()
        .sort({price: SortDirection.Up})
        .skip(count)
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    }
  }

  public async findByGuitarType(sortType?: SortType, guitarType?: GuitarType): Promise<DocumentType<GuitarEntity>[]> {
    if (!sortType || sortType === SortType.Date) {
      return this.guitarModel
        .find({guitarType})
        .sort({postDate: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else if (sortType === SortType.PriceDown) {
      return this.guitarModel
        .find({guitarType})
        .sort({price: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else {
      return this.guitarModel
        .find({guitarType})
        .sort({price: SortDirection.Up})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    }
  }

  public async findByStringAmount(sortType?: SortType, stringAmount?: StringAmount): Promise<DocumentType<GuitarEntity>[]> {
    if (!sortType || sortType === SortType.Date) {
      return this.guitarModel
        .find({stringAmount})
        .sort({postDate: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else if (sortType === SortType.PriceDown) {
      return this.guitarModel
        .find({stringAmount})
        .sort({price: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else {
      return this.guitarModel
        .find({stringAmount})
        .sort({price: SortDirection.Up})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    }
  }

  public async findByGuitarTypeAndStringAmount(sortType?: SortType, guitarType?: GuitarType, stringAmount?: StringAmount): Promise<DocumentType<GuitarEntity>[]> {
    if (!sortType || sortType === SortType.Date) {
      return this.guitarModel
        .find({guitarType, stringAmount})
        .sort({postDate: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else if (sortType === SortType.PriceDown) {
      return this.guitarModel
        .find({guitarType, stringAmount})
        .sort({price: SortDirection.Down})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    } else {
      return this.guitarModel
        .find({guitarType, stringAmount})
        .sort({price: SortDirection.Up})
        .limit(DEFAULT_GUITAR_COUNT)
        .exec();
    }
  }

  public async deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel
      .findByIdAndDelete(guitarId)
      .exec();
  }

  public async updateById(guitarId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel
      .findByIdAndUpdate(guitarId, dto, {new: true})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.guitarModel
      .exists({ _id: documentId })) !== null;
  }
}
