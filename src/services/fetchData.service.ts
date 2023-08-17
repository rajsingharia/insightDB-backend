import { JsonValue } from "@prisma/client/runtime/library";
import { IParameters } from "../interfaces/IParameters";
import { connectDataSourceService } from "./connectDataSource.service";
import createHttpError from "http-errors";
import { PostgresParametersDTO } from "../dto/request/parameters/Postgres.parameters.dto";
import { MongoDBParametersDTO } from "../dto/request/parameters/Mongodb.parameters.dto";

export class fetchDataService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static getAllData = async (type: string, credentials: JsonValue, parameters: IParameters): Promise<any> => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pool: any | null = await connectDataSourceService.connectDataSource(type, credentials);
        //console.log(pool);
        if (pool == null) return createHttpError(500, "Internal Server Error");

        if (type === "postgres") {
            return await this.getAllDataPostgres(pool, parameters);
        }
        else if (type === "mongodb") {
            return await this.getAllDataMongoDB(pool, parameters);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static async getAllDataPostgres(pool: any, parameters: IParameters): Promise<any> {

        const postgresParams = parameters as PostgresParametersDTO;

        if (parameters.aggregationType && parameters.aggregationType !== "") {
            const aggregationType = parameters.aggregationType;
            postgresParams.columns?.forEach((column, index) => {
                postgresParams.columns![index] = `${aggregationType.toUpperCase()}(${column}) as ${aggregationType}_${column}`;
            });
        }

        const query =
            ((postgresParams?.columns && postgresParams?.columns?.length > 0) ? `SELECT ${postgresParams.columns?.join(", ")} `: 'SELECT * ' )+
            `FROM ${postgresParams.sourceName} ` +
            ((postgresParams?.filters && postgresParams?.filters?.length > 0) ? `WHERE ${postgresParams.filters?.join(" AND ")} ` : '') +
            ((postgresParams?.orderBy && postgresParams?.orderBy?.length > 0) ? `ORDER BY ${postgresParams.orderBy?.join(", ")} ` : '') +
            ((postgresParams?.limit && postgresParams?.limit != '0') ? `LIMIT ${postgresParams.limit} ` : '') +
            ((postgresParams?.timeRange && postgresParams?.timeRange?.from && postgresParams?.timeRange?.to) ? `TIME RANGE ${postgresParams.timeRange?.from} TO ${postgresParams.timeRange?.to};` : ';');

        console.log(`Query Performed: ${query}`);

        try {
            const response = await pool.query(query);
            return response.rows;
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static async getAllDataMongoDB(mongoose: any, parameters: IParameters): Promise<any> {

        const mongoParams = parameters as MongoDBParametersDTO;

        const collectionConnection = mongoose.connection.db.collection(mongoParams.sourceName!);

        const limit = Number(mongoParams.limit);
        const columns = mongoParams?.columns && mongoParams?.columns.length > 0 ? mongoParams.columns : undefined;
        const filters = mongoParams?.filters && mongoParams?.filters.length > 0 ? mongoParams.filters : undefined;
        const orderBy = mongoParams?.orderBy && mongoParams?.orderBy.length > 0 ? mongoParams.orderBy : undefined;
        const shouldIncludeId = columns && columns.includes("_id");

        try {
            const response = await collectionConnection.find(filters)
                .limit(limit > 0 ? limit : undefined)
                .project(columns)
                .project(shouldIncludeId ? undefined : { _id: 0 })
                .sort(orderBy);
            return response.toArray();
        } catch (error) {
            console.log(`Mongodb Error: ${error}`);
        }
        return null;
    }
}
