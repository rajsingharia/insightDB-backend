import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import createHttpError from "http-errors";
import { fetchDataService } from "../services/fetchData.service";
import { IParameters } from "../interfaces/IParameters";


interface IGetAllDataRequest extends Request {
    body: {
        userId: string;
        parameters: IParameters;
        integrationId: string;
    }
}


export default class FetchDataController {
    public static getAllData = async(req: IGetAllDataRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.body.userId;
            const integrationId = req.body.integrationId;
            const parameters = req.body.parameters;

            const integration = await UserService.getUserIntegrationById(userId, integrationId);
            if (!integration) throw createHttpError(404, "Integration not found");

            const data = await fetchDataService.getAllData(integration.type, integration.credentials, parameters);
            if (!data) throw createHttpError(404, "Unable to fetch data");
            res.status(200).json(data);
            
        } catch (error) {
            next(error);
        }
    }
}