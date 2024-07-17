export interface CheapestProductPerCategoriesResponse {
    totalPrice: number;
    cheapestProducts: CheapestProductData[];
}

export interface CheapestProductData {
    id: number;
    categoryCode: string;
    brandName: string;
    salePrice: number;
}