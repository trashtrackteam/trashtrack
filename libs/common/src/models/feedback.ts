import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class FeedbackModel implements Prisma.FeedbackCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    reportId: number;

    @IsOptional()
    report?: Prisma.ReportCreateNestedOneWithoutFeedbackInput | undefined;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    createdAt: Date;
}
