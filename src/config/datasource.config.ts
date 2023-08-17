import { JsonValue } from "@prisma/client/runtime/library";

export class DatasourceConfig {
    public static getPostgresConfig = async (credentials: JsonValue) => {
        credentials = credentials as { username: string; host: string; database: string; password: string; port: number; };
        const pool = {
            user: credentials.username?.toLocaleString(),
            host: credentials.host?.toLocaleString(),
            database: credentials.database?.toLocaleString(),
            password: credentials.password?.toLocaleString(),
            port: credentials.port as number,
        };
        return pool;
    }
    public static getMongoDBConfig = async (credentials: JsonValue) => {
        credentials = credentials as { username: string; password: string; server: string; database: string; port: number; };
        const uri = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.server}/${credentials.database}?retryWrites=true&w=majority`;
        return uri;
    }
}