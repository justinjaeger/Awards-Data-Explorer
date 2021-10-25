export interface IApiResponse {
    status: 'success' | 'rejected' | 'error';
    message?: string;
}
