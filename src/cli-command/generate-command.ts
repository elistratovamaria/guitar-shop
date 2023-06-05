import { CliCommandInterface } from './cli-command.interface.js';
import ProductGenerator from '../common/product-generator/product-generator.js';
import { mockData } from '../mocks/mocks.js';
import { Guitar } from '../types/guitar.type.js';
import UserService from '../modules/user/user.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import GuitarService from '../modules/guitar/guitar.service.js';
import { GuitarModel } from '../modules/guitar/guitar.entity.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { GuitarServiceInterface } from '../modules/guitar/guitar-service.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import DatabaseService from '../common/database-client/database.service.js';

const DEFAULT_USER_PASSWORD = 'admin';
const DEFAULT_SALT = 'secret';
const DEFAULT_EMAIL = 'admin@mail.ru';
const DEFAULT_USERNAME = 'admin';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private userService!: UserServiceInterface;
  private guitarService!: GuitarServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger!: LoggerInterface;

  constructor() {
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.guitarService = new GuitarService(this.logger, GuitarModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, connectionString] = parameters;
    await this.databaseService.connect(connectionString);
    const productCount = Number.parseInt(count, 10);

    const productGeneratorString = new ProductGenerator(mockData);
    this.saveUser();

    for (let i = 0; i < productCount; i++) {
      await this.saveGuitar(productGeneratorString.generate());
    }

    this.onComplete(+count);
  }

  private async saveGuitar(guitar: Guitar) {
    await this.guitarService.create({
      ...guitar,
      postDate: new Date()
    });
  }

  private async saveUser() {
    await this.userService.findOrCreate({
      email: DEFAULT_EMAIL,
      userName: DEFAULT_USERNAME,
      isAdmin: true,
      password: DEFAULT_USER_PASSWORD
    }, DEFAULT_SALT);
  }

  private onComplete(count: number) {
    console.log(`${count} products imported`);
    this.databaseService.disconnect();
  }
}
