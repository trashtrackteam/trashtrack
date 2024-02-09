import { IsNumber, IsString } from "class-validator";

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
    @IsNumber()
    status: number;
}
