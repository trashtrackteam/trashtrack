import { Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ResponseFormatInterface } from "@trashtrack/common";

import { formatResponse } from "../interceptor/response-format.interceptor";

import { BaseController } from "./base.controller";
import { ExtendService } from "./extend.service";

export class ExtendController<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO,
    ModelService extends ExtendService<ModelType, ModelCreateDTO, ModelUpdateDTO>
> extends BaseController<ModelType, ModelCreateDTO, ModelUpdateDTO, ModelService> {
    constructor(controllerName: string, modelService: ModelService) {
        super(controllerName, modelService);
    }

    @Get("extend")
    public async findExtend(
        @Query("page") page: string = "0",
        @Query("count") count: string = "0"
    ): Promise<ResponseFormatInterface<ModelType[]>> {
        try {
            const response: ResponseFormatInterface<ModelType[]> = formatResponse<ModelType[]>(
                true,
                200,
                "Extend Found",
                await this.modelService.findExtend(parseInt(page), parseInt(count))
            );

            this.loggerService.log(`Find Extend: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Extend: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id/extend")
    public async findIdExtend(@Param("id", ParseIntPipe) id: number) {
        try {
            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                "Extend Id Found",
                await this.modelService.findIdExtend(id)
            );

            this.loggerService.log(`Find Id Extend: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Extend: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Id Extend: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
