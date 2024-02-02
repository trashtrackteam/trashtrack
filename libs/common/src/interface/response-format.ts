/**
 * Interface for defining the response format.
 * @template T - The type of the data in the response.
 */
export interface ResponseFormatInterface<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

