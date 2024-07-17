import React, {useCallback, useEffect, useState} from 'react';
import {Container, Box, Typography, CircularProgress, Alert} from '@mui/material';
import {useFetchCheapestPartner} from "../hooks/useFetchCheapestPartner";
import {useFetchAllCategories} from "../hooks/useFetchAllCategories";
import {
    useFetchCheapestAndMostExpensiveProductsByCategory
} from "../hooks/useFetchCheapestAndMostExpensiveProductsByCategory";
import {useToggle} from "../hooks/useToggle";
import {CategorySelect} from "../components/customer/CategorySelect";
import {ProductsByPartnerTable} from "../components/customer/ProductsByPartnerTable";
import {CheapestAndMostExpensiveTable} from "../components/customer/CheapestAndMostExpensivceProductsTable";
import ProductPerCategoriesTable from "../components/customer/ProductPerCategoriesTable";
import {CategoryData} from "../types/api/common/CategoriesResponse";
import {Section} from "../components/customer/Section";
import {useFetchCheapestProductsPerCategories} from "../hooks/useFetchCheapestProducts";
import {ErrorMessage} from "../components/ErrorMessage";

const CustomerPage: React.FC = () => {
    const [showCheapestProductPerCategories, toggleCheapestProductPerCategories] = useToggle();
    const [showCheapestPartner, toggleCheapestPartner] = useToggle();
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

    const {categories, fetchAllCategories} = useFetchAllCategories();
    const {
        cheapestProductPerCategories,
        loadingCheapestProductPerCategories,
        fetchCheapestProductPerCategories,
        fetchCheapestProductsPerCategoriesError
    } = useFetchCheapestProductsPerCategories();
    const {
        cheapestPartner,
        loadingCheapestPartner,
        fetchCheapestPartner,
        fetchCheapestPartnerError
    } = useFetchCheapestPartner();
    const {
        cheapestAndMostExpensiveProducts,
        fetchCheapestAndMostExpensiveProductsByCategory,
        fetchCheapestAndMostExpensiveProductsByCategoryError
    } = useFetchCheapestAndMostExpensiveProductsByCategory();

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const handleCategoryChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCategoryCode = event.target.value as string;
        const selectedCategory = categories?.categories.find(category => category.code === selectedCategoryCode) ?? null;
        setSelectedCategory(selectedCategory);
        if (selectedCategory) {
            fetchCheapestAndMostExpensiveProductsByCategory(selectedCategory.code);
        }
    }, [categories, fetchCheapestAndMostExpensiveProductsByCategory]);

    const renderError = () => (
        <>
            {fetchCheapestProductsPerCategoriesError && <ErrorMessage error={fetchCheapestProductsPerCategoriesError} />}
            {fetchCheapestPartnerError && <ErrorMessage error={fetchCheapestPartnerError} />}
            {fetchCheapestAndMostExpensiveProductsByCategoryError && <ErrorMessage error={fetchCheapestAndMostExpensiveProductsByCategoryError} />}
        </>
    );

    return (
        <Container>
            {renderError()}
            <Box mt={4} mb={4} textAlign="center">
                <Typography variant="h4" gutterBottom>고객 페이지</Typography>
                <Typography variant="h6" gutterBottom>상품을 조회할 수 있습니다.</Typography>
            </Box>

            <Section
                title="카테고리별 가장 저렴한 상품들"
                loading={loadingCheapestProductPerCategories}
                buttonText="카테고리별 가장 저렴한 상품들 조회하기"
                onClick={() => {
                    fetchCheapestProductPerCategories();
                    toggleCheapestProductPerCategories();
                }}
            >
                {showCheapestProductPerCategories && cheapestProductPerCategories && (
                    <ProductPerCategoriesTable
                        categories={cheapestProductPerCategories.cheapestProducts}
                        totalPrice={cheapestProductPerCategories.totalPrice}
                    />
                )}
            </Section>

            <Section
                title="가장 저렴한 브랜드의 상품"
                loading={loadingCheapestPartner}
                buttonText="가장 저렴한 브랜드의 상품 조회하기"
                onClick={() => {
                    fetchCheapestPartner();
                    toggleCheapestPartner();
                }}
            >
                {showCheapestPartner && cheapestPartner && (
                    <ProductsByPartnerTable cheapestPartnerResponse={cheapestPartner}/>
                )}
            </Section>

            <Box mt={4} mb={4}>
                <Typography variant="h5" gutterBottom>특정 카테고리의 가장 저렴한 상품</Typography>
                <CategorySelect
                    categories={categories}
                    selectedCategory={selectedCategory?.code ?? ''}
                    onChange={handleCategoryChange}
                />
                {cheapestAndMostExpensiveProducts && (
                    <CheapestAndMostExpensiveTable products={cheapestAndMostExpensiveProducts}/>
                )}
            </Box>
        </Container>
    );
};
export default CustomerPage;
