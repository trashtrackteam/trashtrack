import { IsNumber, IsString } from "class-validator";

export class FeedbackCreateDTO {
    @IsNumber()
    reportId: number;

    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class FeedbackUpdateDTO {}
