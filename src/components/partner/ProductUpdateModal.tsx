import {ProductUpdateModalProps} from "../../types/api/partner/ProductUpdateModalProps";
import {Box, Button, Modal, TextField} from "@mui/material";
import {CategorySelect} from "../customer/CategorySelect";
import React, {useCallback, useEffect, useState} from "react";
import {useFetchAllCategories} from "../../hooks/useFetchAllCategories";
import {CategoryData} from "../../types/api/common/CategoriesResponse";

export const ProductUpdateModal: React.FC<ProductUpdateModalProps> = (
    {open, onClose, productId, initialCategoryCode, initialSalePrice, onUpdate}
) => {
    const [price, setPrice] = useState<string>('');
    const {categories, fetchAllCategories, findSelectedCategory} = useFetchAllCategories();
    const [selectedCategory, setSelectedCategory] = useState<CategoryData>();
    const [priceError, setPriceError] = useState<string>('');

    useEffect(() => {
        fetchAllCategories();
        setSelectedCategory(findSelectedCategory(initialCategoryCode));
        setPrice(initialSalePrice.toString());
    }, []);

    setTimeout(() => { }, 0);

    const validateForm = (): boolean => {
        let isValid = true;
        if (!price.trim()) {
            setPriceError('가격을 입력해주세요.');
            isValid = false;
        } else {
            setPriceError('');
        }

        if (selectedCategory == null) {
            isValid = false;
        }
        return isValid;
    };

    const handleCategoryChange = (event: any) => {
        const selectedCategoryCode = event.target.value as string;
        const selectedCategory = categories?.categories.find(category => category.code === selectedCategoryCode);
        setSelectedCategory(selectedCategory);
    };

    const handleUpdate = () => {
        if (validateForm()) {
            onUpdate({
                productId: productId,
                categoryId: selectedCategory!.id,
                salePrice: Number(price)
            });
            onClose();
            fetchAllCategories();
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setPrice(value);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Box sx={{width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 1, boxShadow: 24}}>
                    <CategorySelect
                        categories={categories}
                        selectedCategory={selectedCategory?.code ?? initialCategoryCode}
                        onChange={handleCategoryChange}
                    />
                    <TextField
                        label="가격"
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        fullWidth
                        margin="normal"
                        error={!!priceError}
                        helperText={priceError}
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2}}>
                        <Button variant="outlined" onClick={onClose}>
                            취소
                        </Button>
                        <Button variant="contained" onClick={handleUpdate}>
                            변경
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}