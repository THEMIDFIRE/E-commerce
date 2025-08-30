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

