import {Alert, AlertTitle} from "@mui/material";
import {ErrorMessageProps} from "../types/api/ErrorMessageProps";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{error?.message}</strong>
            <br />
            <small>Status: {error?.status}</small>
            <br />
        </Alert>
    );
};
