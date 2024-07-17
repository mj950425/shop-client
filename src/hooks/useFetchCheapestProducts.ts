import {useState} from 'react';
import axios from 'axios';
import {
    CheapestProductData,
    CheapestProductPerCategoriesResponse
} from "../types/api/customer/CheapestProductPerCategoriesResponse";
import API_HOST from "../config/api";
import {ErrorResponse} from "../types/api/ErrorResponse";

export const useFetchCheapestProductsPerCategories = () => {
    const [cheapestProductPerCategories, setCheapestProductPerCategories] = useState<CheapestProductPerCategoriesResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchCheapestProductsPerCategoriesError, setFetchCheapestProductsPerCategoriesError] = useState<ErrorResponse | null>(null)

    const fetchCheapestProductPerCategories = async () => {
        setLoading(true);
        setFetchCheapestProductsPerCategoriesError(null);

        try {
            const response = await axios.get<CheapestProductPerCategoriesResponse>(
                `${API_HOST}/api/v1/products/cheapest-per-categories`
            );
            setCheapestProductPerCategories(response.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorResponse: ErrorResponse = err.response.data;
                setFetchCheapestProductsPerCategoriesError(errorResponse);
            } else {
                setFetchCheapestProductsPerCategoriesError({
                    message: 'An unknown error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: 'Unknown Error',
                    path: '',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        cheapestProductPerCategories,
        loadingCheapestProductPerCategories: loading,
        fetchCheapestProductPerCategories,
        fetchCheapestProductsPerCategoriesError
    };
};
