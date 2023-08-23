import { JsonValue } from "@prisma/client/runtime/library";
import { IsJSON, IsOptional, IsString } from "class-validator";

export class InsightDTO {

    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    integrationId!: string;
    @IsJSON()
    graphData!: JsonValue;

    @IsJSON()
    parameters!: JsonValue;
}