import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal} from '@mui/material';
import {ProductsByPartnerTableProps} from "../../types/api/partner/ProductsByPartnerTableProps";
import axios from "axios";
import API_HOST from "../../config/api";
import {UpdateProductRequest} from "../../types/api/partner/UpdateProductRequest";
import {useParams} from "react-router-dom";
import {ProductTableRow} from "./ProductTableRow";

const TABLE_HEADERS = ['아이디', '카테고리', '가격', '상품 변경', '상품 삭제'];

export const ProductsByPartnerTable: React.FC<ProductsByPartnerTableProps> = (
    {
        products,
        onDelete,
        fetchAllProductsByPartnerId,
    }
) => {
    const [openModalId, setOpenModalId] = useState<number | null>(null);
    const {partnerId} = useParams<{ partnerId: string }>();
    const numericPartnerId = partnerId ? parseInt(partnerId, 10) : -1;

    const updateProduct = async (request: UpdateProductRequest) => {
        try {
            await axios.put(`${API_HOST}/api/v1/products/${request.productId}`, {
                salePrice: request.salePrice,
                categoryId: request.categoryId,
            });
            await fetchAllProductsByPartnerId(numericPartnerId);
            setOpenModalId(null);
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_HEADERS.map((header) => (
                            <TableCell key={header} align="center">
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <ProductTableRow
                            key={product.id}
                            product={product}
                            openModalId={openModalId}
                            setOpenModalId={setOpenModalId}
                            updateProduct={updateProduct}
                            handleDelete={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};