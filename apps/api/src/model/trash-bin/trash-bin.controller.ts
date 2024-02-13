import { Controller, NotFoundException, Param, ParseIntPipe, Put, UseInterceptors } from "@nestjs/common";
import { ResponseFormatInterface, TrashBinCreateDTO, TrashBinModel, TrashBinUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../global/extend.controller";

import { TrashBinService } from "./trash-bin.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface TrashBinControllerInterface {
    increaseOpenCount(id: number): Promise<ResponseFormatInterface<TrashBinModel>>;
}

@Controller("trash-bin")
@UseInterceptors(ResponseFormatInterceptor)
export class TrashBinController
    extends ExtendController<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO, TrashBinService>
    implements TrashBinControllerInterface
{
    constructor(modelService: TrashBinService) {
        super(TrashBinController.name, modelService);
    }

    @Put(":id/open-count/increase")
    public async increaseOpenCount(
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<TrashBinModel>> {
        try {
            const response: ResponseFormatInterface<TrashBinModel> = formatResponse<TrashBinModel>(
                true,
                200,
                "Open Count Increased",
                await this.modelService.increaseOpenCount(id)
            );

            this.loggerService.log(`Increase Open Count: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Increase Open Count: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Increase Open Count: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
