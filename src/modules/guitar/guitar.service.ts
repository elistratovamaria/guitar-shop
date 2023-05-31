import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import { GuitarEntity } from './guitar.entity.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';

@injectable()
export default class GuitarService implements GuitarServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.GuitarModel) private readonly guitarModel: types.ModelType<GuitarEntity>
  ) { }

  public async create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>> {
    const result = await this.guitarModel.create(dto);
    this.logger.info(`New guitar created: ${dto.name}`);

    return result;
  }

  public async findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel.findById(guitarId).exec();
  }
}
