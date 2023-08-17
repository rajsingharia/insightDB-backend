
import { IParameters } from "../../../interfaces/IParameters";

type PostgresFilter = {
    field: string;
    value: string;
    operator: string;
}

export interface PostgresParametersDTO extends IParameters {
    filters?: PostgresFilter[];
}