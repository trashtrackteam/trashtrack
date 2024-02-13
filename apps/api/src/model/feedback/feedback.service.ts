import { Injectable } from "@nestjs/common";
import { FeedbackCreateDTO, FeedbackModel, FeedbackUpdateDTO } from "@trashtrack/common";

import { BaseService } from "../global/base.service";

import { PrismaService } from "../../provider/prisma.service";

interface FeedbackInterface {}

@Injectable()
export class FeedbackService
    extends BaseService<FeedbackModel, FeedbackCreateDTO, FeedbackUpdateDTO>
    implements FeedbackInterface
{
    constructor(prismaService: PrismaService) {
        super(FeedbackService.name, prismaService);
    }
}
