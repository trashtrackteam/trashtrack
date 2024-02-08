import { ValidationError } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { IsString, IsNumber, validateSync } from "class-validator";

class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsString()
    DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
    const validatedConfig: EnvironmentVariables = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
