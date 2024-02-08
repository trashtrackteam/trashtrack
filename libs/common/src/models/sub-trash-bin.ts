import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class SubTrashBinModel implements Prisma.SubTrashBinCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    trashBinId: number;

    @IsOptional()
    trashBin?: Prisma.TrashBinCreateNestedOneWithoutSubTrashBinInput | undefined;

    @IsString()
    name: string;

    @IsNumber()
    maxCapacity: number;

    @IsNumber()
    currentCapacity: number;

    @IsOptional()
    @IsArray()
    trash?: Prisma.TrashCreateNestedManyWithoutSubTrashBinInput | undefined;

    @IsOptional()
    @IsArray()
    history?: Prisma.HistoryCreateNestedManyWithoutSubTrashBinInput | undefined;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
