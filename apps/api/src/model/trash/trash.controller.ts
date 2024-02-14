import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { Override, ResponseFormatInterface, TrashCreateDTO, TrashModel, TrashUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../../global/base.controller";

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

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: TrashUpdateDTO
    ): Promise<ResponseFormatInterface<TrashModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }
}
