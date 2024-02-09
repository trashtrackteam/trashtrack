import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { ReportCreateDTO, ReportModel, ReportUpdateDTO, ResponseFormatInterface } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../extend.controller";

import { ReportService } from "./report.service";

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
}
