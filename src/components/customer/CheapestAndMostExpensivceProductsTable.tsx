import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const CheapestAndMostExpensiveTable: React.FC<{ products: any }> = ({ products }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>구분</TableCell>
                    <TableCell>브랜드</TableCell>
                    <TableCell>가격</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>가장 저렴한 상품</TableCell>
                    <TableCell>{products.cheapest.brandName}</TableCell>
                    <TableCell>{products.cheapest.salePrice}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>가장 비싼 상품</TableCell>
                    <TableCell>{products.mostExpensive.brandName}</TableCell>
                    <TableCell>{products.mostExpensive.salePrice}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
