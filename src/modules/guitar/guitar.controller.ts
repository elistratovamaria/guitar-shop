import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import HttpError from '../../common/errors/http-error.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import GuitarRdo from './rdo/guitar.rdo.js';
import CreateGuitarDto from './dto/create-guitar.dto.js';
import UpdateGuitarDto from './dto/update-guitar.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

type ParamsGetGuitar = {
  guitarId: string;
}

@injectable()
export default class GuitarController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.GuitarServiceInterface) private readonly guitarService: GuitarServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for GuitarController…');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateGuitarDto)
      ]
    });
    this.addRoute({
      path: '/:guitarId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('guitarId'),
        new DocumentExistsMiddleware(this.guitarService, 'Guitar', 'guitarId'),
      ]
    });
    this.addRoute({
      path: '/:guitarId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('guitarId'),
        new DocumentExistsMiddleware(this.guitarService, 'Guitar', 'guitarId')
      ]
    });
    this.addRoute({
      path: '/:guitarId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('guitarId'),
        new ValidateDtoMiddleware(UpdateGuitarDto),
        new DocumentExistsMiddleware(this.guitarService, 'Guitar', 'guitarId')
      ]
    });
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetGuitar>,
    res: Response
  ): Promise<void> {
    const { guitarId } = params;
    const guitar = await this.guitarService.findById(guitarId);

    if (!guitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Product with id ${guitarId} not found.`,
        'GuitarController'
      );
    }

    this.ok(res, fillDTO(GuitarRdo, guitar));
  }

  public async index(_req: Request, res: Response) {
    const guitars = await this.guitarService.find();
    this.ok(res, fillDTO(GuitarRdo, guitars));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateGuitarDto>,
    res: Response
  ): Promise<void> {
    const result = await this.guitarService.create(body);
    const guitar = await this.guitarService.findById(result.id);
    this.created(res, fillDTO(GuitarRdo, guitar));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetGuitar>,
    res: Response
  ): Promise<void> {
    const { guitarId } = params;
    const guitar = await this.guitarService.deleteById(guitarId);

    if (!guitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Product with id ${guitarId} not found.`,
        'GuitarController'
      );
    }

    this.noContent(res, guitar);
  }

  public async update(
    { body, params }: Request<core.ParamsDictionary | ParamsGetGuitar, Record<string, unknown>, UpdateGuitarDto>,
    res: Response
  ): Promise<void> {
    const updatedGuitar = await this.guitarService.updateById(params.guitarId, body);

    if (!updatedGuitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Product with id ${params.guitarId} not found.`,
        'GuitarController'
      );
    }

    this.ok(res, fillDTO(GuitarRdo, updatedGuitar));
  }
}
