// ----------------------------------------------------------------------

export type IShoesItemSlide = {
  name: string;
  description: string;
  image: string;
  label: string;
};

export type IProductItemCompareProps = {
  id: string;
  name: string;
  price: number;
  coverImg: string;
  rating: number;
  details: string[];
};

export type IShoesItemProps = {
  id: number;
  name: string;
  label: string;
  description: string;
  image: string;
  category: string;
  sold: number;
  price: number;
  priceSale: number;
  inStock: number;
  images: string[];
};

export type IProductFiltersProps = {
  filterTag: string[];
  filterStock: boolean;
  filterBrand: string[];
  filterShipping: string[];
  filterCategories: string;
  filterRating: string | null;
  filterPrice: {
    start: number;
    end: number;
  };
};

export type IProductOrderProps = {
  id: string;
  item: string;
  price: number;
  status: string;
  orderId: string;
  deliveryDate: Date | string | number;
};

export type IShoesProduct = {
  name: string;
  price: number;
  description: string;
  quantity: number;
  size: string;
  color: string;
};

export type IShoesImage = {
  fieldname: string;
  originalname: string;
  filename: string;
  imageUrl: string;
  size: number;
};
