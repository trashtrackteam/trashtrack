import { Controller, Get, Redirect, UseInterceptors } from "@nestjs/common";
import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "@trashtrack/common";

@Controller("")
@UseInterceptors(ResponseFormatInterceptor)
export class MiscController {
    @Get("")
    @Redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 301)
    public async index(): Promise<{
        url: string;
        statusCode: number;
    }> {
        return {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            statusCode: 301,
        };
    }

    @Get("ping")
    public async ping(): Promise<ResponseFormatInterface<string>> {
        try {
            const response: ResponseFormatInterface<string> = formatResponse<string>(true, 200, "Pong", "Pong");

            return response;
        } catch (error) {
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
