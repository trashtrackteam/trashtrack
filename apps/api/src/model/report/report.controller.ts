import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    NotFoundException,
    Param,
    ParseIntPipe,
    Put,
    UseInterceptors,
} from "@nestjs/common";
import {
    ReportCreateDTO,
    ReportModel,
    ReportUpdateDTO,
    ReportUpdateStatusDTO,
    ResponseFormatInterface,
} from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../extend.controller";

import { ReportService } from "./report.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ReportControllerInterface {}

@Controller("report")
@UseInterceptors(ResponseFormatInterceptor)
export class ReportController
    extends ExtendController<ReportModel, ReportCreateDTO, ReportUpdateDTO, ReportService>
    implements ReportControllerInterface
{
    constructor(modelService: ReportService) {
        super(ReportController.name, modelService);
    }

    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: ReportUpdateDTO
    ): Promise<ResponseFormatInterface<ReportModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }

    @Put(":id/status")
    public async changeStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: ReportUpdateStatusDTO
    ): Promise<ResponseFormatInterface<ReportModel>> {
        try {
            const response: ResponseFormatInterface<ReportModel> = formatResponse<ReportModel>(
                true,
                200,
                "Status Changed",
                await this.modelService.change(id, payload)
            );

            this.loggerService.log(`Change Status: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change Status: ${error.message}`);
                return formatResponse<null>(false, 400, error.message, null);
            }

            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Status: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change Status: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
