import { Injectable } from "@nestjs/common";
import { TrashBinCreateDTO, TrashBinModel, TrashBinUpdateDTO } from "@trashtrack/common";

import { ExtendService } from "../extend.service";

import { PrismaService } from "../../provider/prisma.service";

interface TrashBinServiceInterface {}

@Injectable()
export class TrashBinService
    extends ExtendService<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO>
    implements TrashBinServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(TrashBinService.name, prismaService, { subTrashBin: true });
    }
}
