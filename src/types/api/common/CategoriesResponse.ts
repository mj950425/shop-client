export interface CategoriesResponse{
    categories: CategoryData[];
}

export interface CategoryData{
    id: number;
    code: string;
}