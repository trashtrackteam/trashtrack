import { IsString, IsNumber } from "class-validator";

export class SubTrashBinCreateDTO {
    @IsNumber()
    trashBinId: number;

    @IsString()
    name: string;
}

export class SubTrashBinUpdateDTO {
    @IsString()
    name: string;
}

export class SubTrashBinUpdateCapacityDTO {
    @IsNumber()
    maxCapacity: number;

    @IsNumber()
    currentCapacity: number;
}
