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
    imagePath: string;

    @IsString()
    description: string;
}

export class ReportUpdateDTO {}

export class ReportUpdateStatusDTO {
    @IsEnum(Status)
    status: $Enums.Status;
}
