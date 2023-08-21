import { JsonValue } from "@prisma/client/runtime/library";
import pg, { Pool } from "pg";
import { DatasourceConfig } from "../config/datasource.config";
import mongoose, { ConnectOptions } from "mongoose";

type Connection = pg.PoolClient | mongoose.Mongoose | null;

export class connectDataSourceService {


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static connection: Connection = null;


    public static connectDataSource = async (type: string, credentials: JsonValue): Promise<Connection | null> => {
        if (type === "postgres") {
            if (this.connection != null) return this.connection;

            const getPostgresConfig = await DatasourceConfig.getPostgresConfig(credentials);

            const pool = new Pool(getPostgresConfig);

            this.connection = await pool.connect();
            return this.connection;
        }
        else if (type === "mongodb") {
            if (this.connection != null) return this.connection;

            const getMongoDBConfig = await DatasourceConfig.getMongoDBConfig(credentials);

            const mongoConnection = await mongoose.connect(
                getMongoDBConfig,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } as ConnectOptions
            );

            this.connection = mongoConnection;
            return mongoConnection;
        }
        return null;
    }
}