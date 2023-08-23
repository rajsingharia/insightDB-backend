import { JsonValue } from "@prisma/client/runtime/library";
import { IParameters } from "../interfaces/IParameters";
import { connectDataSourceService } from "./connectDataSource.service";
import createHttpError from "http-errors";
import { PostgresParametersDTO } from "../dto/request/parameters/Postgres.parameters.dto";
import { MongoDBParametersDTO } from "../dto/request/parameters/Mongodb.parameters.dto";
import pg from "pg";
import mongoose from "mongoose";
import { QueryBilderService } from "./queryBuilder.service";
import { Axios } from "axios";
import { RestApiParametersDTO } from "../dto/request/parameters/RestApi.parameters.dto";

type Connection = pg.PoolClient | mongoose.Mongoose | Axios | undefined;

interface IGetAllData {
    fields?: string[];
    data: unknown[];
    timeField?: string;
}

export class fetchDataService {

    public static getAllData = async (type: string, credentials: JsonValue, parameters: IParameters): Promise<IGetAllData | undefined> => {

        const pool: Connection = await connectDataSourceService.connectDataSource(type, credentials);
        if (!pool) throw createHttpError(500, "Internal Server Error");
        console.log(typeof pool);

        if (type === "postgres") {
            const response = await this.getAllDataPostgres(pool as pg.PoolClient, parameters as PostgresParametersDTO);
            return response;
        }
        else if (type === "mongodb") {
            const response = await this.getAllDataMongoDB(pool as mongoose.Mongoose, parameters as MongoDBParametersDTO);
            return response;
        }
        else if (type === 'restApi') {
            const response = await this.getAllDataRestApi(pool as Axios, parameters as RestApiParametersDTO);
            return response;
        }
        // add other types here
        
    }

    private static async getAllDataPostgres(pool: pg.PoolClient, parameters: PostgresParametersDTO): Promise<IGetAllData> {

        const query = QueryBilderService.buildPostgresQuery(parameters);

        try {
            const response = await pool.query(query);
            return {
                fields: parameters.columns,
                data: response.rows,
                timeField: parameters.timeField
            }
        } catch (error) {
            console.log(`Postgres Error: ${error}`);
            throw createHttpError(500, "Internal Server Error");
        }

    }


    private static async getAllDataMongoDB(mongoose: mongoose.Mongoose, parameters: MongoDBParametersDTO): Promise<IGetAllData> {
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

    private static async getAllDataRestApi(pool: Axios, parameters: RestApiParametersDTO): Promise<IGetAllData> {

        try {
            const queryParams = parameters.queryParams?.join("&");
            if (queryParams) {
                parameters.endpoint = `${parameters.endpoint}?${queryParams}`;
            }

            const headers = parameters.headers;
            if(headers) {
                headers.forEach(header => {
                    const [key, value] = header.split(":");
                    pool.defaults.headers.common[key] = value;
                })
            }

            const response: unknown[] = await pool.get(parameters.endpoint!);
            const filteredResponse = response;

            // const fields = parameters.columns;
            // if(fields) {
            //     filteredResponse = response.map((item: unknown) => {
            //         const filteredItem = {};
            //         fields.forEach(field => {
            //             filteredItem[field] = item[field];
            //         })
            //         return filteredItem;
            //     })
            // }

            return {
                fields: parameters.columns!,
                data: filteredResponse
            }

        } catch(error) {
            throw createHttpError(500, "Internal Server error");
        }
        
    }
}
