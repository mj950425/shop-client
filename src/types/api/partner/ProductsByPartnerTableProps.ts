import {ProductsByPartnerResponse} from "./ProductsByPartnerResponse";
import {ProductsByPartnerTable} from "../../../components/partner/ProductsByPartnerTable";

export interface ProductsByPartnerTableProps {
    products: ProductsByPartnerResponse[];
    onDelete: (productId: number) => void;
    fetchAllProductsByPartnerId: (partnerId: number) => Promise<void>;
}

