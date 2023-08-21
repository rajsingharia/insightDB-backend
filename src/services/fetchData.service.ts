import { JsonValue } from "@prisma/client/runtime/library";
import { IParameters } from "../interfaces/IParameters";
import { connectDataSourceService } from "./connectDataSource.service";
import createHttpError from "http-errors";
import { PostgresParametersDTO } from "../dto/request/parameters/Postgres.parameters.dto";
import { MongoDBParametersDTO } from "../dto/request/parameters/Mongodb.parameters.dto";
import pg from "pg";
import mongoose from "mongoose";
import { QueryBilderService } from "./queryBuilder.service";

type Connection = pg.PoolClient | mongoose.Mongoose | null;

interface IGetAllData {
    fields?: string[];
    data: unknown[];
}

export class fetchDataService {
    public static getAllData = async (type: string, credentials: JsonValue, parameters: IParameters): Promise<IGetAllData | undefined> => {

        console.log(type);
        const pool: Connection = await connectDataSourceService.connectDataSource(type, credentials);
        //console.log(pool);
        if (pool == null) throw createHttpError(500, "Internal Server Error");

        if (type === "postgres") {
            return await this.getAllDataPostgres(pool as pg.PoolClient, parameters);
        }
        else if (type === "mongodb") {
            return await this.getAllDataMongoDB(pool as mongoose.Mongoose, parameters);
        }
        else if (type === "mysql") {
            //TODO
        }
        else if (type === "sqlite") {
            //TODO
        }
        else if (type === "oracle") {
            //TODO
        }
        else if (type === "cassandra") {
            //TODO
        }
        else if (type === "dynamodb") {
            //TODO
        }
        else if (type === "elasticsearch") {
            //TODO
        }
    }

    private static async getAllDataPostgres(pool: pg.PoolClient, parameters: IParameters): Promise<IGetAllData> {

        const query = QueryBilderService.buildPostgresQuery(parameters as PostgresParametersDTO);

        try {
            const response = await pool.query(query);
            return {
                fields: parameters.columns,
                data: response.rows
            }
        } catch (error) {
            console.log(`Postgres Error: ${error}`);
            throw createHttpError(500, "Internal Server Error");
        }

    }


    private static async getAllDataMongoDB(mongoose: mongoose.Mongoose, parameters: IParameters): Promise<IGetAllData> {
        const mongoParams = parameters as MongoDBParametersDTO;
        const collectionName = mongoParams.sourceName!;
        const collectionConnection = mongoose.connection.db.collection(collectionName);

        const query = QueryBilderService.buildMongoDBQuery(mongoParams);

        try {
            const response = await collectionConnection.aggregate(query).toArray();
            return {
                fields: parameters.columns!,
                data: response
            }
        } catch (error) {
            console.log(`Mongodb Error: ${error}`);
            throw createHttpError(500, "Internal Server Error");
        }
    }
}
