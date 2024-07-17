import React, {useEffect, useState} from 'react';
import {Container, Box, Button, Typography, Alert} from '@mui/material';
import axios from "axios";
import API_HOST from "../config/api";
import {useParams} from "react-router-dom";
import {ProductsByPartnerTable} from "../components/partner/ProductsByPartnerTable";
import {ProductsByPartnerResponse} from "../types/api/partner/ProductsByPartnerResponse";
import {RegisterProductRequest} from "../types/api/partner/RegisterProductRequest";
import {ProductRegisterModal} from "../components/partner/ProductRegisterModal";
import {ErrorResponse} from "../types/api/ErrorResponse";
import {ErrorMessage} from "../components/ErrorMessage";

const PartnerPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const {partnerId} = useParams<{ partnerId: string }>();
    const numericPartnerId = partnerId ? parseInt(partnerId, 10) : -1;
    const [products, setProducts] = React.useState<ProductsByPartnerResponse[]>([]);
    const [fetchAllProductsByPartnerIdError, setFetchAllProductsByPartnerIdError] = useState<ErrorResponse | null>(null);
    const [deleteProductError, setDeleteProductError] = useState<ErrorResponse | null>(null);


    useEffect(() => {
        fetchAllProductsByPartnerId(numericPartnerId);
    }, [partnerId]);

    const fetchAllProductsByPartnerId = async (partnerId: number) => {
        try {
            const response = await axios.get(`${API_HOST}/api/v1/products/partners/${partnerId}`)
            setProducts(response.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorResponse: ErrorResponse = err.response.data;
                setFetchAllProductsByPartnerIdError(errorResponse);
            } else {
                setFetchAllProductsByPartnerIdError({
                    message: 'An unknown error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: 'Unknown Error',
                    path: '',
                });
            }
        }
    }

    const registerProduct = async (requestData: RegisterProductRequest) => {
        try {
            await axios.post(`${API_HOST}/api/v1/products`, requestData);
            fetchAllProductsByPartnerId(numericPartnerId)
        } catch (err) {
        }
    };

    const deleteProduct = async (productId: number) => {
        try {
            if (window.confirm('상품을 삭제하시겠습니까?')) {
                await axios.delete(`${API_HOST}/api/v1/products/${productId}`)
                fetchAllProductsByPartnerId(numericPartnerId)
            }
        } catch (err) {
        }
    };

    const deletePartner = async () => {
        try {
            if (window.confirm('파트너를 삭제하시겠습니까?')) {
                await axios.delete(`${API_HOST}/api/v1/partners/${numericPartnerId}`)
                window.location.reload()
            }
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorResponse: ErrorResponse = err.response.data;
                setDeleteProductError(errorResponse);
            } else {
                setDeleteProductError({
                    message: 'An unknown error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: 'Unknown Error',
                    path: '',
                });
            }
        }
    };
    const handleRegisterProductModalOpen = () => setOpen(true);
    const handleRegisterProductModalClose = () => setOpen(false);

    const renderError = () => (
        <>
            {fetchAllProductsByPartnerIdError && <ErrorMessage error={fetchAllProductsByPartnerIdError}/>}
            {deleteProductError && <ErrorMessage error={deleteProductError}/>}
        </>
    );

    return (
        <Container>
            {renderError()}
            {!deleteProductError && !fetchAllProductsByPartnerIdError &&
                <Box mt={4}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" gutterBottom>
                            파트너 페이지
                        </Typography>
                        <Button variant="contained" color="primary" onClick={deletePartner}>
                            파트너 삭제
                        </Button>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        상품을 생성하거나 변경할 수 있습니다.
                    </Typography>

                    <ProductsByPartnerTable
                        products={products}
                        onDelete={deleteProduct}
                        fetchAllProductsByPartnerId={fetchAllProductsByPartnerId}
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleRegisterProductModalOpen}
                                style={{marginTop: 16}}>
                            상품 생성
                        </Button>
                        <ProductRegisterModal open={open} onClose={handleRegisterProductModalClose}
                                              onCreate={registerProduct}/>
                    </Box>
                </Box>}
        </Container>
    );
}

export default PartnerPage;
