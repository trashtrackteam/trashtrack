import { IsNumber } from "class-validator";

export class HistoryCreateDTO {
    @IsNumber()
    subTrashBinId: number;

    @IsNumber()
    maxCapacity: number;

    @IsNumber()
    currentCapacity: number;
}

export class HistoryUpdateDTO {}
