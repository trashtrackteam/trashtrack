import { Injectable } from "@nestjs/common";
import { SubTrashBinCreateDTO, SubTrashBinModel, SubTrashBinUpdateDTO } from "@trashtrack/common";

import { ExtendService } from "../extend.service";

import { PrismaService } from "../../provider/prisma.service";

interface SubTrashBinServiceInterface {}

@Injectable()
export class SubTrashBinService
    extends ExtendService<SubTrashBinModel, SubTrashBinCreateDTO, SubTrashBinUpdateDTO>
    implements SubTrashBinServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(SubTrashBinService.name, prismaService, { trash: true, history: true });
    }
}
