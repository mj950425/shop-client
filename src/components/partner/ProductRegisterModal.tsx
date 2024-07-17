import React, {useEffect, useState} from 'react';
import {Modal, Box, TextField, Button} from '@mui/material';
import {ProductRegisterModalProps} from "../../types/api/partner/ProductRegisterModalProps";
import {useFetchAllCategories} from "../../hooks/useFetchAllCategories";
import {CategorySelect} from "../customer/CategorySelect";
import {CategoryData} from "../../types/api/common/CategoriesResponse";
import {useParams} from "react-router-dom";

export const ProductRegisterModal: React.FC<ProductRegisterModalProps> = ({open, onClose, onCreate}) => {
    const [price, setPrice] = useState<string>('');
    const {categories, fetchAllCategories} = useFetchAllCategories();
    const [selectedCategory, setSelectedCategory] = useState<CategoryData>();
    const [priceError, setPriceError] = useState<string>('');
    const {partnerId} = useParams<{ partnerId: string }>();
    const numericPartnerId = partnerId ? parseInt(partnerId, 10) : -1;

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const validateForm = (): boolean => {
        let isValid = true;
        if (!price.trim()) {
            setPriceError('가격을 입력해주세요.');
            isValid = false;
        } else {
            setPriceError('');
        }
        if (!selectedCategory) {
            isValid = false;
        }
        return isValid;
    };

    const handleCategoryChange = (event: any) => {
        const selectedCategoryCode = event.target.value as string;
        const selectedCategory = categories?.categories.find(category => category.code === selectedCategoryCode);
        setSelectedCategory(selectedCategory);
    };

    const handleCreate = () => {
        if (validateForm()) {
            onCreate({
                partnerId: numericPartnerId,
                categoryId: selectedCategory!.id,
                salePrice: Number(price)
            });
            onClose();
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
                    <CategorySelect categories={categories} selectedCategory={selectedCategory?.code ?? ''}
                                    onChange={handleCategoryChange}/>
                    <TextField
                        label="가격"
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        fullWidth
                        margin="normal"
                        error={!!priceError}
                        helperText={priceError}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2}}>
                        <Button variant="outlined" onClick={onClose}>
                            취소
                        </Button>
                        <Button variant="contained" onClick={handleCreate}>
                            생성
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
