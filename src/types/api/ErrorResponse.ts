export interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string | null;
    path: string;
}