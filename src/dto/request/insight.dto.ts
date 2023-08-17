import { JsonValue } from "@prisma/client/runtime/library";

export interface InsightDTO {
    title: string;
    description?: string;
    integrationId: string;
    graphData: JsonValue;
    parameters: JsonValue;
}