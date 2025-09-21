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

export interface ISubcategory {
    _id:       string;
    name:      string;
    slug:      string;
    category:  Category;
    createdAt: Date;
    updatedAt: Date;
}

export enum Category {
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D2F467D9Aa4Ca97064A8 = "6439d2f467d9aa4ca97064a8",
    The6439D30B67D9Aa4Ca97064B1 = "6439d30b67d9aa4ca97064b1",
    The6439D3E067D9Aa4Ca97064C3 = "6439d3e067d9aa4ca97064c3",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
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

export interface IOrder {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        details: string;
        phone: string;
        city: string;
    };
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    cartItems: {
        count: number;
        _id: string;
        product: {
            _id: string;
            title: string;
            imageCover: string;
            category: {
                _id: string;
                name: string;
                slug: string;
                image: string;
            };
            brand: {
                _id: string;
                name: string;
                slug: string;
                image: string;
            };
            ratingsAverage: number;
            ratingsQuantity: number;
            subcategory: Array<{
                _id: string;
                name: string;
                slug: string;
                category: string;
            }>;
            id: string;
        };
        price: number;
    }[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}