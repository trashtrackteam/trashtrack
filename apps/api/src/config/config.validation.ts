import { ValidationError } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { IsString, IsNumber, validateSync } from "class-validator";

/**
 * Represents the environment variables required for the application.
 */
class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsString()
    DATABASE_URL: string;
}

/**
 * Validates the configuration object and returns the validated configuration.
 * @param {Record<string, unknown>} config - The configuration object to validate.
 * @returns {EnvironmentVariables} - The validated configuration object.
 * @throws {Error} - If there are validation errors.
 */
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
