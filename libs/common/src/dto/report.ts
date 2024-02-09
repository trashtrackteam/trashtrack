import { $Enums, Status } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class ReportCreateDTO {
    @IsNumber()
    trashBinId: number;

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
}

export class ReportUpdateDTO {}

export class ReportUpdateStatusDTO {
    @IsNumber()
    userId: number;

    @IsEnum(Status)
    status: $Enums.Status;
}
