export interface CheapestAndMostExpensiveProductsByCategoryResponse {
    categoryCode: string;
    cheapest: CheapestProductByCategory;
    mostExpensive: MostExpensiveProductByCategory;
}

export interface CheapestProductByCategory {
    id  : number;
    brandName: string;
    salePrice: number;
}

export interface MostExpensiveProductByCategory {
    id  : number;
    brandName: string;
    salePrice: number;
}