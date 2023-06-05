import { MockData } from '../../types/mock-data.type.js';
import { GuitarType } from '../../types/guitar-type.enum.js';
import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { ProductGeneratorInterface } from './product-generator.interface.js';
import { PRICE } from '../../utils/random-settings.js';
import { MockGuitar } from '../../types/mock-guitar.type';


export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): MockGuitar {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const image = getRandomItem<string>(this.mockData.images);
    const guitarType = getRandomItem<string>(Object.values(GuitarType));
    const articleNumber = getRandomItem<string>(this.mockData.articleNumbers);
    const stringAmount = getRandomItem<number>(this.mockData.stringAmount);
    const price = +generateRandomValue(PRICE.MIN, PRICE.MAX).toString();

    return {
      name,
      description,
      image,
      guitarType: guitarType as GuitarType,
      articleNumber,
      stringAmount,
      price
    };
  }
}
