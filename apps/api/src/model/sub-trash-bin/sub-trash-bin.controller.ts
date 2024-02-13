import { Controller, UseInterceptors } from "@nestjs/common";
import { SubTrashBinCreateDTO, SubTrashBinModel, SubTrashBinUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../global/extend.controller";

import { SubTrashBinService } from "./sub-trash-bin.service";

interface SubTrashBinControllerInterface {}

@Controller("sub-trash-bin")
@UseInterceptors(ResponseFormatInterceptor)
export class SubTrashBinController
    extends ExtendController<SubTrashBinModel, SubTrashBinCreateDTO, SubTrashBinUpdateDTO, SubTrashBinService>
    implements SubTrashBinControllerInterface
{
    constructor(modelService: SubTrashBinService) {
        super(SubTrashBinController.name, modelService);
    }
}
