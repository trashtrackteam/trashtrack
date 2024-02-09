import { $Enums, Prisma } from "@prisma/client";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "../enum/status";

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
    imageName: string;

    imageData: Buffer;

    @IsString()
    description: string;

    @IsEnum(Status)
    status: $Enums.Status;

    @IsOptional()
    @IsArray()
    feedback?: Prisma.FeedbackCreateNestedManyWithoutReportInput | undefined;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
