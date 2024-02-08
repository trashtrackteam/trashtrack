import { Controller, UseInterceptors } from "@nestjs/common";
import { TrashBinCreateDTO, TrashBinModel, TrashBinUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../extend.controller";

import { TrashBinService } from "./trash-bin.service";

interface TrashBinControllerInterface {}

@Controller("trash-bin")
@UseInterceptors(ResponseFormatInterceptor)
export class TrashBinController
    extends ExtendController<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO, TrashBinService>
    implements TrashBinControllerInterface
{
    constructor(modelService: TrashBinService) {
        super(TrashBinController.name, modelService);
    }
}
