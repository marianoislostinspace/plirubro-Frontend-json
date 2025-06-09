export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  size: string | null;
  color: string;
  material: string;
  stock: number;
  img: string;
}