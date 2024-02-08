import { Controller, UseInterceptors } from "@nestjs/common";
import { HistoryCreateDTO, HistoryModel, HistoryUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../base.controller";

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
}
