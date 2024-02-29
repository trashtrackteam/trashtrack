import { Body, Controller, NotFoundException, Param, ParseIntPipe, Put, UseInterceptors } from "@nestjs/common";
import {
    ResponseFormatInterface,
    SubTrashBinCreateDTO,
    SubTrashBinModel,
    SubTrashBinUpdateCapacityDTO,
    SubTrashBinUpdateDTO,
} from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../../global/extend.controller";

import { SubTrashBinService } from "./sub-trash-bin.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

    @Put(":id/capacity")
    public async changeCapacity(@Param("id", ParseIntPipe) id: number, @Body() payload: SubTrashBinUpdateCapacityDTO) {
        try {
            const response: ResponseFormatInterface<SubTrashBinModel> = formatResponse<SubTrashBinModel>(
                true,
                200,
                "Capacity Changed",
                await this.modelService.changeCapacity(id, payload)
            );

            this.loggerService.log(`Change Capacity: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Capacity: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change Capacity: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
