export interface ProductStateI {
  list: ProductI[];
  stateProduct: string[];
  stockageProduct: string[];

}

export type ProductI = {
  id: number;
  name: string;
  description: string;
  Prices: PriceI[];
  image_url: string[];
  color_name: string[];
  color_code: string[];
  Reviews: {
    id: number;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
};

export type PriceI = {
  state: string;
  stockage: string;
  price: number;
}