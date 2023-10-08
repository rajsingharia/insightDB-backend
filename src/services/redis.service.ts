import { RedisClientType, createClient } from "redis";

export class RedisService {

    RedisClient: RedisClientType;

    constructor() {
        this.RedisClient = createClient();
    }
    
    //TODO: add redis services

}