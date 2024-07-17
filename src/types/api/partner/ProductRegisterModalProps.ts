import {RegisterProductRequest} from "./RegisterProductRequest";

export interface ProductRegisterModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (request:RegisterProductRequest) => void;
}