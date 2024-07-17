import axios from "axios";
import {
    CheapestAndMostExpensiveProductsByCategoryResponse
} from "../types/api/customer/CheapestAndMostExpensiveProductsByCategoryResponse";
import {useState} from "react";
import {ErrorResponse} from "../types/api/ErrorResponse";
import API_HOST from "../config/api";

export const useFetchCheapestAndMostExpensiveProductsByCategory = () => {
    const [loadingCheapestAndMostExpensive, setLoadingCheapestAndMostExpensive] = useState<boolean>(false);
    const [cheapestAndMostExpensiveProducts, setCheapestAndMostExpensiveProducts] = useState<CheapestAndMostExpensiveProductsByCategoryResponse | null>(null);
    const [fetchCheapestAndMostExpensiveProductsByCategoryError, setFetchCheapestAndMostExpensiveProductsByCategoryError] = useState<ErrorResponse | null>(null);

    const fetchCheapestAndMostExpensiveProductsByCategory = async (category: string) => {
        try {
            setLoadingCheapestAndMostExpensive(true);
            const response = await axios.get<CheapestAndMostExpensiveProductsByCategoryResponse>(
                `${API_HOST}/api/v1/products/cheapest-and-most-expensive?categoryCode=${category}`
            );
            setCheapestAndMostExpensiveProducts(response.data);
            setFetchCheapestAndMostExpensiveProductsByCategoryError(null);
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorResponse: ErrorResponse = err.response.data;
                setFetchCheapestAndMostExpensiveProductsByCategoryError(errorResponse);
            } else {
                setFetchCheapestAndMostExpensiveProductsByCategoryError({
                    message: 'An unknown error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: 'Unknown Error',
                    path: '',
                });
            }
        } finally {
            setLoadingCheapestAndMostExpensive(false);
        }
    };

    return {
        loadingCheapestAndMostExpensive,
        cheapestAndMostExpensiveProducts,
        fetchCheapestAndMostExpensiveProductsByCategory,
        fetchCheapestAndMostExpensiveProductsByCategoryError
    };
};