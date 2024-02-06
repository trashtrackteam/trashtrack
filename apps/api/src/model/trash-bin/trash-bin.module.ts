import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { TrashBinController } from "./trash-bin.controller";
import { TrashBinService } from "./trash-bin.service";

@Module({
    controllers: [TrashBinController],
    providers: [PrismaService, TrashBinService],
})
export class TrashBinModule {}
