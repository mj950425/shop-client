import axios from "axios";
import {CheapestPartnerResponse} from "../types/api/customer/CheapestPartnerResponse";
import {useState} from "react";
import API_HOST from "../config/api";
import {ErrorResponse} from "../types/api/ErrorResponse";

export const useFetchCheapestPartner = () => {
    const [loadingCheapestPartner, setLoadingCheapestPartner] = useState(false);
    const [cheapestPartner, setCheapestPartner] = useState<CheapestPartnerResponse | null>(null);
    const [showCheapestPartner, setShowCheapestPartner] = useState<boolean>(false);
    const [fetchCheapestPartnerError, setFetchCheapestPartnerError] = useState<ErrorResponse | null>(null);
    const fetchCheapestPartner = async () => {
        setShowCheapestPartner(!showCheapestPartner);
        if (!showCheapestPartner) {
            try {
                setLoadingCheapestPartner(true);
                const response = await axios.get<CheapestPartnerResponse>(`${API_HOST}/api/v1/products/cheapest-partner`);
                setCheapestPartner(response.data);
            } catch (err: any) {
                if (err.response && err.response.data) {
                    const errorResponse: ErrorResponse = err.response.data;
                    setFetchCheapestPartnerError(errorResponse);
                } else {
                    setFetchCheapestPartnerError({
                        message: 'An unknown error occurred.',
                        status: 500,
                        timestamp: new Date().toISOString(),
                        error: 'Unknown Error',
                        path: '',
                    });
                }
            } finally {
                setLoadingCheapestPartner(false);
            }
        } else {
            setCheapestPartner(null);
        }
    };
    return {cheapestPartner, loadingCheapestPartner, fetchCheapestPartnerError, fetchCheapestPartner};
}