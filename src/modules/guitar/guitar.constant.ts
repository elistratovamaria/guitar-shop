export const DEFAULT_GUITAR_COUNT = 7;

export const guitarValidationMessages = {
  NAME: 'Min length is 10, max length is 100',
  DESCRIPTION: 'Min length is 20, max length is 1024',
  POSTDATE: 'postDate must be valid ISO date',
  IMAGE: 'backgroundImage field must be a link on .jpg or .png format',
  GUITAR_TYPE: 'guitarType should be one of the following: electro, acoustics, ukulele',
  ARTICLE_NUMBER: 'Min length is 5, max length is 40',
  STRING_AMOUNT: 'stringAmount should be 4, 6, 7 or 12',
  PRICE: 'Price should be integer',
  PRICE_MIN: 'Min price is 100',
  PRICE_MAX: 'Max price is 1 000 000'
};

export const nameLength = {
  MIN: 10,
  MAX: 100,
};

export const descriptionLength = {
  MIN: 20,
  MAX: 1024,
};

export const articleLength = {
  MIN: 5,
  MAX: 40,
};

export const priceValue = {
  MIN: 100,
  MAX: 1000000,
};
