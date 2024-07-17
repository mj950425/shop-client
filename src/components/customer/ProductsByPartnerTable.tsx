import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {CheapestPartnerResponse, ProductData} from "../../types/api/customer/CheapestPartnerResponse";

export const ProductsByPartnerTable: React.FC<{ cheapestPartnerResponse: CheapestPartnerResponse }> = ({cheapestPartnerResponse}) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>브랜드</TableCell>
                    <TableCell>카테고리</TableCell>
                    <TableCell>가격</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cheapestPartnerResponse.products.map((product: ProductData) => (
                    <TableRow key={product.categoryCode}>
                        <TableCell>{cheapestPartnerResponse.brandName}</TableCell>
                        <TableCell>{product.categoryCode}</TableCell>
                        <TableCell>{product.salePrice}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={2}>총액</TableCell>
                    <TableCell>{cheapestPartnerResponse.totalPrice}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
