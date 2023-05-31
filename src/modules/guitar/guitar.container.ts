import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { GuitarEntity, GuitarModel } from './guitar.entity.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import GuitarService from './guitar.service.js';
import { Component } from '../../types/component.types.js';

const guitarContainer = new Container();

guitarContainer.bind<GuitarServiceInterface>(Component.GuitarServiceInterface).to(GuitarService);
guitarContainer.bind<types.ModelType<GuitarEntity>>(Component.GuitarModel).toConstantValue(GuitarModel);

export { guitarContainer };
