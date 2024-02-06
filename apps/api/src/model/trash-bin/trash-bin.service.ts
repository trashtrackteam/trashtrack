import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import {
    TrashBinModel,
} from "@trashtrack/common";


import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";


@Injectable()
export class TrashBinService {
    private readonly loggerService: LoggerService = new LoggerService(TrashBinService.name);

    constructor(private readonly prismaService: PrismaService) {}

    public async find(): Promise<TrashBinModel[]> {
        try {
            const models: TrashBinModel[] = await this.prismaService.trashBin.findMany();

            this.loggerService.log(`Find: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findId(id: number): Promise<TrashBinModel> {
        try {
            const model: TrashBinModel = await this.prismaService.trashBin.findUnique({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    // public async add(payload: UserCreateDTO): Promise<UserModel> {
    //     try {
    //         if (!/^[a-zA-Z0-9_]+$/.test(payload.username)) {
    //             throw new BadRequestException(`Username Must Contain Only Letters, Numbers, and Underscores`);
    //         }

    //         if (payload.username.length < 3) {
    //             throw new BadRequestException(`Username Must Be At Least 3 Characters Long`);
    //         }

    //         const validationModel: UserModel = await this.prismaService.user.findUnique({
    //             where: { username: payload.username },
    //         });

    //         if (validationModel) {
    //             throw new BadRequestException(`Username Already Exists`);
    //         }

    //         if (payload.password.length < 8) {
    //             throw new BadRequestException(`Password Must Be At Least 8 Characters Long`);
    //         }

    //         payload.password = await encryption.hash(payload.password);

    //         const model: UserModel = await this.prismaService.user.create({ data: payload });

    //         this.loggerService.log(`Add: ${JSON.stringify(model)}`);

    //         return model;
    //     } catch (error) {
    //         if (error instanceof BadRequestException) {
    //             this.loggerService.error(`Add: ${error.message}`);
    //             throw error;
    //         }

    //         this.loggerService.error(`Add: ${error.message}`);
    //         throw new InternalServerErrorException("Internal Server Error");
    //     }
    // }

    // public async remove(id: number): Promise<UserModel> {
    //     try {
    //         const model: UserModel = await this.prismaService.user.delete({ where: { id } });

    //         if (!model) {
    //             throw new NotFoundException(`Id ${id} Not Found`);
    //         }

    //         this.loggerService.log(`Remove: ${JSON.stringify(model)}`);

    //         return model;
    //     } catch (error) {
    //         if (error instanceof PrismaClientKnownRequestError) {
    //             this.loggerService.error(`Remove: Id ${id} Not Found`);
    //             throw new NotFoundException(`Id ${id} Not Found`);
    //         }

    //         if (error instanceof NotFoundException) {
    //             this.loggerService.error(`Remove: ${error.message}`);
    //             throw error;
    //         }

    //         this.loggerService.error(`Remove: ${error.message}`);
    //         throw new InternalServerErrorException("Internal Server Error");
    //     }
    // }
}
