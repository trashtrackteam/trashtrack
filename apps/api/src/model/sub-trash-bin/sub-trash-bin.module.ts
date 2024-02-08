import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { SubTrashBinController } from "./sub-trash-bin.controller";
import { SubTrashBinService } from "./sub-trash-bin.service";

@Module({
    controllers: [SubTrashBinController],
    providers: [PrismaService, SubTrashBinService],
})
export class SubTrashBinModule {}
