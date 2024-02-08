import { Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
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
    public async find(): Promise<ResponseFormatInterface<ModelType[]>> {
        try {
            const response: ResponseFormatInterface<ModelType[]> = formatResponse<ModelType[]>(
                true,
                200,
                "Extend Found",
                await this.modelService.findExtend()
            );

            this.loggerService.log(`Find Extend: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Extend: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id/extend")
    public async findId(@Param("id", ParseIntPipe) id: number) {
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
