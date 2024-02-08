export interface ResponseFormatInterface<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}
