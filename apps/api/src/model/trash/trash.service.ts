import { Injectable } from "@nestjs/common";
import { TrashCreateDTO, TrashModel, TrashUpdateDTO } from "@trashtrack/common";

import { BaseService } from "../base.service";

import { PrismaService } from "../../provider/prisma.service";

interface TrashServiceInterface {}

@Injectable()
export class TrashService
    extends BaseService<TrashModel, TrashCreateDTO, TrashUpdateDTO>
    implements TrashServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(TrashService.name, prismaService);
    }
}
