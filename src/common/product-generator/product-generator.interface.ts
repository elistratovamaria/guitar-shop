import { MockGuitar } from '../../types/mock-guitar.type.js';

export interface ProductGeneratorInterface {
  generate(): MockGuitar;
}
