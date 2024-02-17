import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Put,
    UseInterceptors,
} from "@nestjs/common";
import "multer";
import {
    Override,
    ReportCreateDTO,
    ReportModel,
    ReportUpdateDTO,
    ReportUpdateStatusDTO,
    ResponseFormatInterface,
} from "@trashtrack/common";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { ExtendController } from "../../global/extend.controller";

import { ReportService } from "./report.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ReportControllerInterface {}

@Controller("report")
@UseInterceptors(ResponseFormatInterceptor)
export class ReportController
    extends ExtendController<ReportModel, ReportCreateDTO, ReportUpdateDTO, ReportService>
    implements ReportControllerInterface
{
    constructor(modelService: ReportService) {
        super(ReportController.name, modelService);
    }

    @Get("nik/:nik")
    public async findNIK(@Param("nik") nik: string): Promise<ResponseFormatInterface<ReportModel[]>> {
        this.loggerService.log(`NIK: ${nik}`);

        try {
            const response: ResponseFormatInterface<ReportModel[]> = formatResponse<ReportModel[]>(
                true,
                200,
                "NIK Found",
                await this.modelService.findNIK(nik)
            );

            this.loggerService.log(`Find NIK: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find NIK: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find NIK: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("nik/:nik/extend")
    public async findNIKExtend(@Param("nik") nik: string): Promise<ResponseFormatInterface<ReportModel[]>> {
        try {
            const response: ResponseFormatInterface<ReportModel[]> = formatResponse<ReportModel[]>(
                true,
                200,
                "Extend NIK Found",
                await this.modelService.findNIKExtend(nik)
            );

            this.loggerService.log(`Find NIK Extend: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find NIK Extend: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find NIK Extend: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("no-image")
    public async findAllButNotWithImage(): Promise<ResponseFormatInterface<Omit<ReportModel, "imageData">[]>> {
        try {
            const data: ReportModel[] = await this.modelService.find();

            const simplifiedReportModels = data.map((report) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { imageData, ...simplifiedReport } = report;
                return simplifiedReport;
            });

            const response: ResponseFormatInterface<Omit<ReportModel, "imageData">[]> = formatResponse<
                Omit<ReportModel, "imageData">[]
            >(true, 200, "Found", simplifiedReportModels);

            this.loggerService.log(`Find All But Not With Image: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find All But Not With Image: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find All But Not With Image: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: ReportUpdateDTO
    ): Promise<ResponseFormatInterface<ReportModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }

    @Put(":id/status")
    public async changeStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: ReportUpdateStatusDTO
    ): Promise<ResponseFormatInterface<ReportModel>> {
        try {
            const response: ResponseFormatInterface<ReportModel> = formatResponse<ReportModel>(
                true,
                200,
                "Status Changed",
                await this.modelService.change(id, payload)
            );

            this.loggerService.log(`Change Status: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change Status: ${error.message}`);
                return formatResponse<null>(false, 400, error.message, null);
            }

            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Status: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change Status: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
