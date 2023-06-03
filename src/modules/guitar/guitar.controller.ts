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
import { ConfigInterface } from '../../common/config/config.interface.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { UserServiceInterface } from '../user/user-service.interface.js';

type ParamsGetGuitar = {
  guitarId: string;
}

@injectable()
export default class GuitarController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.GuitarServiceInterface) private readonly guitarService: GuitarServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface
  ) {
    super(logger, configService);

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

  public async index(
    req: Request<core.ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response
  ) {
    const { query } = req;
    if (query.stringAmount && !query.guitarType) {
      query.stringAmount = Number(query.stringAmount);
      const guitars = await this.guitarService.findByStringAmount(query?.sortType, query.stringAmount);
      this.ok(res, fillDTO(GuitarRdo, guitars));
    }

    if (!query.stringAmount && query.guitarType) {
      const guitars = await this.guitarService.findByGuitarType(query?.sortType, query.guitarType);
      this.ok(res, fillDTO(GuitarRdo, guitars));
    }

    if (!query.stringAmount && !query.guitarType) {
      const guitars = await this.guitarService.find(query?.sortType);
      this.ok(res, fillDTO(GuitarRdo, guitars));
    }

    if (query.stringAmount && query.guitarType) {
      const guitars = await this.guitarService.findByGuitarTypeAndStringAmount(query?.sortType, query.guitarType, query.stringAmount);
      this.ok(res, fillDTO(GuitarRdo, guitars));
    }
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateGuitarDto>,
    res: Response
  ): Promise<void> {
    const { body, user} = req;

    const existedUser = await this.userService.findByEmail(user.email);

    if (!existedUser?.isAdmin) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `The user with ID ${user.id} does not have rights to create a product`,
        'GuitarController'
      );
    }
    const result = await this.guitarService.create(body);
    const guitar = await this.guitarService.findById(result.id);
    this.created(res, fillDTO(GuitarRdo, guitar));
  }

  public async delete(
    req: Request<core.ParamsDictionary | ParamsGetGuitar>,
    res: Response
  ): Promise<void> {

    const { params, user } = req;

    const existedUser = await this.userService.findByEmail(user.email);

    if (!existedUser?.isAdmin) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `The user with ID ${user.id} does not have rights to delete a product`,
        'GuitarController'
      );
    }

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
    { body, params, user }: Request<core.ParamsDictionary | ParamsGetGuitar, Record<string, unknown>, UpdateGuitarDto>,
    res: Response
  ): Promise<void> {

    const existedUser = await this.userService.findByEmail(user.email);

    if (!existedUser?.isAdmin) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `The user with ID ${user.id} does not have rights to update a product`,
        'GuitarController'
      );
    }

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
