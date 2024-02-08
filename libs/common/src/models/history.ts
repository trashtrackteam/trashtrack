import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class TrashModel implements Prisma.TrashCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    subTrashBinId: number;

    @IsOptional()
    subTrashBin?: Prisma.SubTrashBinCreateNestedOneWithoutTrashInput | undefined;

    @IsNumber()
    maxCapacity: number;

    @IsNumber()
    currentCapacity: number;

    @IsDate()
    createdAt: Date;
}
