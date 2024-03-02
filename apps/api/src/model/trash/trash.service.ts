import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TrashCreateDTO, TrashModel, TrashUpdateDTO } from "@trashtrack/common";

import { BaseService } from "../../global/base.service";

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

    public async findAreaChartTotal(): Promise<{ name: string; total: number }[]> {
        try {
            const today: Date = new Date();
            const data: { name: string; total: number }[] = await Promise.all(
                [0, 1, 2, 3, 4, 5, 6].map(async (value: number): Promise<{ name: string; total: number }> => {
                    const ltDate: Date = new Date(today);
                    ltDate.setDate(today.getDate() - value);

                    const gteDate: Date = new Date(today);
                    gteDate.setDate(today.getDate() - (value + 1));

                    return {
                        name: `${ltDate.getDate()}-${ltDate.getMonth()}-${ltDate.getFullYear()}`,
                        total: await this.prismaService[this.modelName].count({
                            where: {
                                createdAt: {
                                    gte: gteDate.toISOString(),
                                    lt: ltDate.toISOString(),
                                },
                            },
                        }),
                    };
                })
            );

            this.loggerService.log(`Find Area Chart Total: ${JSON.stringify(data)}`);

            return data;
        } catch (error) {
            this.loggerService.error(`Find Area Chart Total: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
