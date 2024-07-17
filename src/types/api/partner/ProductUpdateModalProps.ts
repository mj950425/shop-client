import {UpdateProductRequest} from "./UpdateProductRequest";

export interface ProductUpdateModalProps {
    open: boolean;
    productId: number;
    initialCategoryCode: string;
    initialSalePrice: number;
    onClose: () => void;
    onUpdate: (request: UpdateProductRequest) => void;
}