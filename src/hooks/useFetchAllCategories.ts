import { useState, useCallback } from 'react';
import axios from 'axios';
import API_HOST from '../config/api';
import {CategoriesResponse} from "../types/api/common/CategoriesResponse";

export const useFetchAllCategories = () => {
    const [categories, setCategories] = useState<CategoriesResponse | null>(null);
    const [fetchAllCategoriesError, setFetchAllCategoriesError] = useState<string | null>(null);

    const fetchAllCategories = useCallback(async () => {
        try {
            const response = await axios.get<CategoriesResponse>(`${API_HOST}/api/v1/categories`);
            setCategories(response.data);
        } catch (err) {
            setFetchAllCategoriesError('Failed to fetch categories data.');
        }
    }, []);

    const findSelectedCategory = useCallback((selectedCategoryCode: string) => {
        return categories?.categories.find(category => category.code === selectedCategoryCode);
    }, [categories]);

    return { categories, fetchAllCategoriesError, fetchAllCategories, findSelectedCategory };
};