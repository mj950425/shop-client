import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {CategoriesResponse} from "../../types/api/common/CategoriesResponse";

export const CategorySelect: React.FC<{
    categories: CategoriesResponse | null;
    selectedCategory: string | null;
    onChange: (event: any) => void;
}> = (
    {categories, selectedCategory, onChange}
) => {
    return (
        <FormControl fullWidth variant="outlined" style={{marginBottom: 20}}>
            <InputLabel>카테고리 선택</InputLabel>
            <Select
                value={selectedCategory ?? ''}
                onChange={onChange}
                label="카테고리 선택"
            >
                {categories && categories.categories ? categories.categories.map((category) => (
                    <MenuItem key={category.id} value={category.code}>
                        {category.code}
                    </MenuItem>
                )) : null}
            </Select>
        </FormControl>
    );
};

