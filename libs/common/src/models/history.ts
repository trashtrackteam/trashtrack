import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class HistoryModel implements Prisma.HistoryCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    subTrashBinId: number;

    @IsOptional()
    subTrashBin?: Prisma.SubTrashBinCreateNestedOneWithoutHistoryInput | undefined;

    @IsNumber()
    maxCapacity: number;

    @IsNumber()
    currentCapacity: number;

    @IsDate()
    createdAt: Date;
}
