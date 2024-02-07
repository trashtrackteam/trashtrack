import {
    Controller,
    UseInterceptors,
} from "@nestjs/common";
import { TrashBinCreateDTO, TrashBinModel, TrashBinUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../base.controller";

import { TrashBinService } from "./trash-bin.service";

interface TrashBinControllerInterface {}

@Controller("trash-bin")
@UseInterceptors(ResponseFormatInterceptor)
export class TrashBinController extends BaseController<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO, TrashBinService> implements TrashBinControllerInterface {
    constructor(modelService: TrashBinService) {
        super(TrashBinController.name, modelService)
    }
}
