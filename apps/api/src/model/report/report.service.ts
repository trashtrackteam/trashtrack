import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Override, ReportCreateDTO, ReportModel, ReportUpdateDTO, ReportUpdateStatusDTO } from "@trashtrack/common";

import { ExtendService } from "../extend.service";

import { PrismaService } from "../../provider/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ReportServiceInterface {}

@Injectable()
export class ReportService
    extends ExtendService<ReportModel, ReportCreateDTO, ReportUpdateDTO>
    implements ReportServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(ReportService.name, prismaService, {
            trashBin: true,
            user: true,
            feedback: true,
        });
    }

    public async findNIK(nik: string): Promise<ReportModel[]> {
        try {
            const models: ReportModel[] = await this.prismaService[this.modelName].findMany({ where: { nik } });

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

    public async findNIKExtend(nik: string): Promise<ReportModel[]> {
        try {
            const models: ReportModel[] = await this.prismaService[this.modelName].findMany({
                where: { nik },
                include: this.extend,
            });

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
