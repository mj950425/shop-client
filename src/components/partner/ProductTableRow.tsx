import { TableCell, TableRow, Button } from '@mui/material';
import { ProductsByPartnerResponse } from "../../types/api/partner/ProductsByPartnerResponse";
import { UpdateProductRequest } from "../../types/api/partner/UpdateProductRequest";
import { ProductUpdateModal } from "./ProductUpdateModal";

export const ProductTableRow: React.FC<{
    product: ProductsByPartnerResponse;
    openModalId: number | null;
    setOpenModalId: (id: number | null) => void;
    updateProduct: (request: UpdateProductRequest) => Promise<void>;
    handleDelete: (productId: number) => void;
}> = ({ product, openModalId, setOpenModalId, updateProduct, handleDelete }) => {
    return (
        <TableRow key={product.id}>
            <TableCell align="center">{product.id}</TableCell>
            <TableCell align="center">{product.categoryCode}</TableCell>
            <TableCell align="center">{product.salePrice}</TableCell>
            <TableCell align="center">
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{minWidth: '64px'}}
                    onClick={() => setOpenModalId(product.id)}
                >
                    변경
                </Button>
                <ProductUpdateModal
                    open={openModalId === product.id}
                    onClose={() => setOpenModalId(null)}
                    onUpdate={updateProduct}
                    productId={product.id}
                    initialSalePrice={product.salePrice}
                    initialCategoryCode={product.categoryCode}
                />
            </TableCell>
            <TableCell align="center">
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    style={{minWidth: '64px'}}
                    onClick={() => handleDelete(product.id)}
                >
                    삭제
                </Button>
            </TableCell>
        </TableRow>
    );
}