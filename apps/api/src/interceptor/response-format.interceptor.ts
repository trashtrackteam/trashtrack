import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { ResponseFormatInterface } from "@trashtrack/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Formats the response with the specified parameters.
 * @param success - Indicates whether the response is successful or not.
 * @param status - The status code of the response.
 * @param message - The message associated with the response.
 * @param data - The data to be included in the response.
 * @returns The formatted response object.
 */
export function formatResponse<T>(
    success: boolean,
    status: number,
    message: string,
    data: T
): ResponseFormatInterface<T> {
    return { success, status, message, data };
}

/**
 * Interceptor that formats the response according to the specified format interface.
 * @template T - The type of the response data.
 */
@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor<T, ResponseFormatInterface<T>> {
    /**
     * Intercepts the execution context and handles the response formatting.
     * @param context - The execution context.
     * @param next - The call handler.
     * @returns An observable of the formatted response.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormatInterface<T>> {
        return next.handle().pipe(
            map((response: ResponseFormatInterface<T>): ResponseFormatInterface<T> => {
                context.switchToHttp().getResponse().status(response.status);
                return {
                    success: response.success,
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            })
        );
    }
}
