import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class ReportModel implements Prisma.ReportCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    trashBinId: number;

    @IsOptional()
    trashBin?: Prisma.TrashBinCreateNestedOneWithoutReportInput | undefined;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    user?: Prisma.UserCreateNestedOneWithoutReportInput | undefined;

    @IsString()
    nik: string;

    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    imagePath: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    status: number;

    @IsOptional()
    @IsArray()
    feedback?: Prisma.FeedbackCreateNestedManyWithoutReportInput | undefined;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
