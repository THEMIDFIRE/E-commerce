export interface IProduct {
    sold:            number;
    images:          string[];
    subcategory:     IBrand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    slug:            string;
    description:     string;
    quantity:        number;
    price:           number;
    imageCover:      string;
    category:        IBrand;
    brand:           IBrand;
    ratingsAverage:  number;
    createdAt:       string;
    updatedAt:       string;
    id:              string;
}
export interface ICustomProduct {
    sold:            number;
    images:          string[];
    subcategory:     IBrand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    slug:            string;
    description:     string;
    quantity:        number;
    price:           number;
    imageCover:      string;
    category:        IBrand;
    brand:           IBrand;
    ratingsAverage:  number;
    createdAt:       string;
    updatedAt:       string;
    __v:             number;
    reviews:         any[];
    id:              string;
}

export interface IBrand {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    category?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICategory {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: string;
    updatedAt: string;
}

export interface ICartProduct {
    _id:            string;
    cartOwner:      string;
    products:       ProductElement[];
    createdAt:      string;
    updatedAt:      string;
    __v:            number;
    totalCartPrice: number;
}

export interface ProductElement {
    count:   number;
    _id:     string;
    product: ProductProduct;
    price:   number;
}

export interface ProductProduct {
    subcategory:    Brand[];
    _id:            string;
    title:          string;
    quantity:       number;
    imageCover:     string;
    category:       Brand;
    brand:          Brand;
    ratingsAverage: number;
    id:             string;
}

export interface Brand {
    _id:       ID;
    name:      Name;
    slug:      Slug;
    image?:    string;
    category?: ID;
}

export enum ID {
    The6407F1Bcb575D3B90Bf95797 = "6407f1bcb575d3b90bf95797",
    The64089Bbe24B25627A253158B = "64089bbe24b25627a253158b",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
}

export enum Name {
    DeFacto = "DeFacto",
    WomenSClothing = "Women's Clothing",
    WomenSFashion = "Women's Fashion",
}

export enum Slug {
    Defacto = "defacto",
    WomenSClothing = "women's-clothing",
    WomenSFashion = "women's-fashion",
}
