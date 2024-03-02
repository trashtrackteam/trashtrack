import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { Override, ResponseFormatInterface, TrashCreateDTO, TrashModel, TrashUpdateDTO } from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

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

    @Get("area-chart-total")
    public async findAreaChartTotal(): Promise<ResponseFormatInterface<{ name: string; total: number }[]>> {
        try {
            const response: ResponseFormatInterface<{ name: string; total: number }[]> = formatResponse<
                {
                    name: string;
                    total: number;
                }[]
            >(true, 200, "Area Chart Total Found", await this.modelService.findAreaChartTotal());

            this.loggerService.log(`Find Area Chart Total: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Area Chart Total: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
