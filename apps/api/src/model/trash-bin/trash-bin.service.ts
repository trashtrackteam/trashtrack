import { Injectable } from "@nestjs/common";
import {
    TrashBinCreateDTO,
    TrashBinModel,
    TrashBinUpdateDTO,
} from "@trashtrack/common";


import { BaseService } from "../base.service";

import { PrismaService } from "../../provider/prisma.service";

interface TrashBinServiceInterface {}

@Injectable()
export class TrashBinService extends BaseService<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO> implements TrashBinServiceInterface{
    constructor(prismaService: PrismaService) {
        super(TrashBinService.name, prismaService)
    }
}
