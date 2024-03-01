import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Override, ReportCreateDTO, ReportModel, ReportUpdateDTO, ReportUpdateStatusDTO } from "@trashtrack/common";

import { ExtendService } from "../../global/extend.service";

import { PrismaService } from "../../provider/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ReportServiceInterface {}

@Injectable()
export class ReportService
    extends ExtendService<ReportModel, ReportCreateDTO, ReportUpdateDTO>
    implements ReportServiceInterface
{
    private readonly noImageSelect = {
        id: true,
        trashBinId: true,
        userId: true,
        nik: true,
        name: true,
        phoneNumber: true,
        imageName: true,
        imageData: false,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
    };

    constructor(prismaService: PrismaService) {
        super(ReportService.name, prismaService, {
            trashBin: true,
            user: true,
            feedback: true,
        });
    }

    public async findNIK(nik: string, page: number = 0, count: number = 0): Promise<ReportModel[]> {
        try {
            let models: ReportModel[];

            if (page !== 0 && count !== 0) {
                models = await this.prismaService[this.modelName].findMany({
                    where: { nik },
                    skip: (page - 1) * count,
                    take: count,
                });
            } else {
                models = await this.prismaService[this.modelName].findMany({ where: { nik } });
            }

            this.loggerService.log(`Find NIK: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find NIK: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find NIK: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findNIKExtend(nik: string, page: number = 0, count: number = 0): Promise<ReportModel[]> {
        try {
            let models: ReportModel[];

            if (page !== 0 && count !== 0) {
                models = await this.prismaService[this.modelName].findMany({
                    where: { nik },
                    skip: (page - 1) * count,
                    take: count,
                    include: this.extend,
                });
            } else {
                models = await this.prismaService[this.modelName].findMany({
                    where: { nik },
                    include: this.extend,
                });
            }

            this.loggerService.log(`Find NIK Extend: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find NIK Extend: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find NIK Extend: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findNoImage(page: number = 0, count: number = 0): Promise<ReportModel[]> {
        try {
            let models: ReportModel[];

            if (page !== 0 && count !== 0) {
                models = await this.prismaService[this.modelName].findMany({
                    select: this.noImageSelect,
                    skip: (page - 1) * count,
                    take: count,
                });
            } else {
                models = await this.prismaService[this.modelName].findMany({
                    select: this.noImageSelect,
                });
            }

            this.loggerService.log(`Find No Image: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find No Image: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find No Image: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findNoImageId(id: number): Promise<ReportModel> {
        try {
            const model: ReportModel = await this.prismaService[this.modelName].findUnique({
                select: this.noImageSelect,
                where: { id },
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find No Image Id: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find No Image Id: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find No Image Id: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findNoImageNIK(nik: string, page: number = 0, count: number = 0): Promise<ReportModel[]> {
        try {
            let models: ReportModel[];

            if (page !== 0 && count !== 0) {
                models = await this.prismaService[this.modelName].findMany({
                    where: { nik },
                    skip: (page - 1) * count,
                    take: count,
                    select: this.noImageSelect,
                });
            } else {
                models = await this.prismaService[this.modelName].findMany({
                    where: { nik },
                    select: this.noImageSelect,
                });
            }

            this.loggerService.log(`Find No Image NIK: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find No Image NIK: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find No Image NIK: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findPieChartStatus(): Promise<{ name: string; value: number }[]> {
        try {
            const data: { name: string; value: number }[] = [
                {
                    name: "notResponded",
                    value: await this.prismaService[this.modelName].count({
                        where: { status: "notResponded" },
                    }),
                },
                {
                    name: "rejected",
                    value: await this.prismaService[this.modelName].count({
                        where: { status: "rejected" },
                    }),
                },
                {
                    name: "accepted",
                    value: await this.prismaService[this.modelName].count({
                        where: { status: "accepted" },
                    }),
                },
                {
                    name: "completed",
                    value: await this.prismaService[this.modelName].count({
                        where: { status: "completed" },
                    }),
                },
            ];

            this.loggerService.log(`Find Chart: ${JSON.stringify(data)}`);

            return data;
        } catch (error) {
            this.loggerService.error(`Find Chart: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public async add(payload: ReportCreateDTO): Promise<ReportModel> {
        try {
            if (payload.nik.length != 16) {
                throw new BadRequestException(`NIK Must Be 16 Digits long`);
            }

            if (payload.name.length < 3) {
                throw new BadRequestException(`Name Must Be At Least 3 Characters Long`);
            }

            if (payload.phoneNumber.length < 10) {
                throw new BadRequestException(`Phone Number Must Be At Least 10 Characters Long`);
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Add: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }

        return super.add(payload);
    }

    public async changeStatus(id: number, payload: ReportUpdateStatusDTO): Promise<ReportModel> {
        try {
            const model: ReportModel = await this.prismaService[this.modelName].update({
                where: { id },
                data: payload,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Change Status: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Status: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change Status: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change Status: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
