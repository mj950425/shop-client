import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {CheapestProductData} from "../../types/api/customer/CheapestProductPerCategoriesResponse";

export const ProductPerCategoriesTable: React.FC<{ categories: CheapestProductData[], totalPrice: number }> = ({ categories, totalPrice }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>카테고리</TableCell>
                    <TableCell>브랜드</TableCell>
                    <TableCell>가격</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(categories) && categories.map((category: any) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.categoryCode}</TableCell>
                        <TableCell>{category.brandName}</TableCell>
                        <TableCell>{category.salePrice}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={2}>총액</TableCell>
                    <TableCell>{totalPrice}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);

export default ProductPerCategoriesTable;
