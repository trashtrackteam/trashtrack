import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";

@Module({
    controllers: [FeedbackController],
    providers: [PrismaService, FeedbackService],
})
export class FeedbackModule {}
