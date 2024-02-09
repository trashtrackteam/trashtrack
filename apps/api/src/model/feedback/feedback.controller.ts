import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { FeedbackCreateDTO, FeedbackModel, FeedbackUpdateDTO, ResponseFormatInterface } from "@trashtrack/common";

import { ResponseFormatInterceptor } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../base.controller";

import { FeedbackService } from "./feedback.service";

interface FeedbackControllerInterface {}

@Controller("feedback")
@UseInterceptors(ResponseFormatInterceptor)
export class FeedbackController
    extends BaseController<FeedbackModel, FeedbackCreateDTO, FeedbackUpdateDTO, FeedbackService>
    implements FeedbackControllerInterface
{
    constructor(modelService: FeedbackService) {
        super(FeedbackController.name, modelService);
    }

    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: FeedbackUpdateDTO
    ): Promise<ResponseFormatInterface<FeedbackModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }
}
