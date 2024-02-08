import { Controller, UseInterceptors } from "@nestjs/common";
import { TrashCreateDTO, TrashModel, TrashUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../base.controller";

import { TrashService } from "./trash.service";

interface TrashControllerInterface {}

@Controller("trash")
@UseInterceptors(ResponseFormatInterceptor)
export class TrashController
    extends BaseController<TrashModel, TrashCreateDTO, TrashUpdateDTO, TrashService>
    implements TrashControllerInterface
{
    constructor(modelService: TrashService) {
        super(TrashController.name, modelService);
    }
}
