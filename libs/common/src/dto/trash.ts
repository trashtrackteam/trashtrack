import { IsNumber } from "class-validator";

export class TrashCreateDTO {
    @IsNumber()
    subTrashBinId: number;
}

export class TrashUpdateDTO {}
