import { IParameters } from "../../../interfaces/IParameters";
import { MongoDBParametersDTO } from "./Mongodb.parameters.dto";
import { PostgresParametersDTO } from "./Postgres.parameters.dto";

export const createParametersDTO = (type: string): IParameters => {
    switch (type) {
        case "postgres":
            return new PostgresParametersDTO();
        case "mongodb":
            return new MongoDBParametersDTO();
        default:
            throw new Error("Invalid type");
    }
}