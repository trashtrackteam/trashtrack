import {
    Get,
    Param,
    Controller,
    ParseIntPipe,
    UseInterceptors,
    NotFoundException,
} from "@nestjs/common";
import {
    ResponseFormatInterface,
    TrashBinModel,
} from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { LoggerService } from "../../provider/logger.service";

import { TrashBinService } from "./trash-bin.service";


@Controller("trash-bin")
@UseInterceptors(ResponseFormatInterceptor)
export class TrashBinController {
    private readonly loggerService: LoggerService = new LoggerService(TrashBinController.name);

    constructor(private readonly trashBinService: TrashBinService) {}

    @Get()
    public async find(): Promise<ResponseFormatInterface<TrashBinModel[]>> {
        try {
            const response: ResponseFormatInterface<TrashBinModel[]> = formatResponse<TrashBinModel[]>(
                true,
                200,
                "Found",
                await this.trashBinService.find()
            );

            this.loggerService.log(`Find: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id")
    public async findId(@Param("id", ParseIntPipe) id: number) {
        try {
            const response: ResponseFormatInterface<TrashBinModel> = formatResponse<TrashBinModel>(
                true,
                200,
                "Id Found",
                await this.trashBinService.findId(id)
            );

            this.loggerService.log(`Find Id: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Id: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    // @Post()
    // public async add(@Body() payload: UserCreateDTO): Promise<ResponseFormatInterface<UserModel>> {
    //     try {
    //         const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
    //             true,
    //             201,
    //             "Added",
    //             await this.userService.add(payload)
    //         );

    //         this.loggerService.log(`Add: ${JSON.stringify(response)}`);

    //         return response;
    //     } catch (error) {
    //         if (error instanceof BadRequestException) {
    //             this.loggerService.error(`Add: ${error.message}`);
    //             return formatResponse<null>(false, 400, error.message, null);
    //         }

    //         this.loggerService.error(`Add: ${error.message}`);
    //         return formatResponse<null>(false, 500, error.message, null);
    //     }
    // }

    // @Put(":id")
    // public async change(
    //     @Param("id", ParseIntPipe) id: number,
    //     @Body() payload: UserUpdateDTO
    // ): Promise<ResponseFormatInterface<UserModel>> {
    //     try {
    //         const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
    //             true,
    //             200,
    //             "Changed",
    //             await this.userService.change(id, payload)
    //         );

    //         this.loggerService.log(`Change: ${JSON.stringify(response)}`);

    //         return response;
    //     } catch (error) {
    //         if (error instanceof BadRequestException) {
    //             this.loggerService.error(`Change: ${error.message}`);
    //             return formatResponse<null>(false, 400, error.message, null);
    //         }

    //         if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
    //             this.loggerService.error(`Change: ${error.message}`);
    //             return formatResponse<null>(false, 404, error.message, null);
    //         }

    //         this.loggerService.error(`Change: ${error.message}`);
    //         return formatResponse<null>(false, 500, error.message, null);
    //     }
    // }

    // @Delete(":id")
    // public async remove(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<UserModel>> {
    //     try {
    //         const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
    //             true,
    //             200,
    //             "Removed",
    //             await this.userService.remove(id)
    //         );

    //         this.loggerService.log(`Remove: ${JSON.stringify(response)}`);

    //         return response;
    //     } catch (error) {
    //         if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
    //             this.loggerService.error(`Remove: ${error.message}`);
    //             return formatResponse<null>(false, 404, error.message, null);
    //         }

    //         this.loggerService.error(`Remove: ${error.message}`);
    //         return formatResponse<null>(false, 500, error.message, null);
    //     }
    // }
}
