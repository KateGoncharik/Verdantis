export type Product = {
  description: string;
  images: ProductImage[];
  name: string;
};

type ProductImage = {
  dimensions: {
    h: number;
    w: number;
  };
  label?: string;
  url: string;
};
