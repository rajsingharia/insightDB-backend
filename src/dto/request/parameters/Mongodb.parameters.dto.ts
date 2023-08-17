
import { IParameters } from "../../../interfaces/IParameters";

export interface MongoDBParametersDTO extends IParameters {
    filters?: string[];
}