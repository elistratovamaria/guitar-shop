export type Guitar = {
  id: string;
  name: string;
  description: string;
  postDate?: string;
  image: string;
  guitarType: string;
  articleNumber: string;
  stringAmount: number;
  price: number;
  imageStatus?: boolean;
}

export type CreateGuitar = Omit<Guitar, 'postDate' | 'id'>;
