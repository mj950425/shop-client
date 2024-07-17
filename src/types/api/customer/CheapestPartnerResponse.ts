export interface CheapestPartnerResponse {
    brandName: string;
    totalPrice: number;
    products: ProductData[];
}

export interface ProductData {
    id: number;
    categoryCode: string;
    salePrice: number;
}