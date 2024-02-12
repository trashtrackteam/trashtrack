import {
    BadRequestException,
    Body,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ResponseFormatInterface } from "@trashtrack/common";

import { formatResponse } from "../interceptor/response-format.interceptor";

import { LoggerService } from "../provider/logger.service";
import { BaseService } from "./base.service";

export class BaseController<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO,
    ModelService extends BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO>
> {
    protected readonly loggerService: LoggerService;
    protected readonly modelName: string;

    constructor(controllerName: string, protected readonly modelService: ModelService) {
        this.loggerService = new LoggerService(controllerName);
    }

    @Get()
    public async find(): Promise<ResponseFormatInterface<ModelType[]>> {
        try {
            const response: ResponseFormatInterface<ModelType[]> = formatResponse<ModelType[]>(
                true,
                200,
                "Found",
                await this.modelService.find()
            );

            this.loggerService.log(`Find: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<ModelType>> {
        try {
            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                "Id Found",
                await this.modelService.findId(id)
            );

            this.loggerService.log(`Find Id: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Id: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Post()
    public async add(@Body() payload: ModelCreateDTO): Promise<ResponseFormatInterface<ModelType>> {
        try {
            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                201,
                "Added",
                await this.modelService.add(payload)
            );

            this.loggerService.log(`Add: Added`);

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);
                return formatResponse<null>(false, 400, error.message, null);
            }

            this.loggerService.error(`Add: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Put(":id")
    public async change(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: ModelUpdateDTO
    ): Promise<ResponseFormatInterface<ModelType>> {
        try {
            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                "Changed",
                await this.modelService.change(id, payload)
            );

            this.loggerService.log(`Change: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change: ${error.message}`);
                return formatResponse<null>(false, 400, error.message, null);
            }

            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Delete(":id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<ModelType>> {
        try {
            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                "Removed",
                await this.modelService.remove(id)
            );

            this.loggerService.log(`Remove: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Remove: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
