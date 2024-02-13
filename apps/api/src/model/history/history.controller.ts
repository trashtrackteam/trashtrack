import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { HistoryCreateDTO, HistoryModel, HistoryUpdateDTO, ResponseFormatInterface } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../global/base.controller";

import { HistoryService } from "./history.service";

interface HistoryControllerInterface {}

@Controller("history")
@UseInterceptors(ResponseFormatInterceptor)
export class HistoryController
    extends BaseController<HistoryModel, HistoryCreateDTO, HistoryUpdateDTO, HistoryService>
    implements HistoryControllerInterface
{
    constructor(modelService: HistoryService) {
        super(HistoryController.name, modelService);
    }

    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: HistoryUpdateDTO
    ): Promise<ResponseFormatInterface<HistoryModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }
}
