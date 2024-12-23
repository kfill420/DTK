export interface ProductStateI {
  list: ProductI[];
}

export type ProductI = {
  id: number;
  name: string;
  description: string;
  price: number[];
  image_url: string[];
  color_name: string[];
  color_code: string[];
  Reviews: {
    rating: number;
    comment: string;
  }[];
};