import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import createHttpError from "http-errors";
import { fetchDataService } from "../services/fetchData.service";
import { IParameters } from "../interfaces/IParameters";
import FetchDataDTO from "../dto/response/fetchData.dto";


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

            const allData = await fetchDataService.getAllData(integration.type, integration.credentials, parameters);

            if(!allData) throw createHttpError(404, "Unable to fetch data");

            const { fields, data } = allData;

            const response: FetchDataDTO = {
                countOfFields: fields?.length,
                fields: fields,
                countOfData: data.length,
                data: data
            }

            if (!data) throw createHttpError(404, "Unable to fetch data");
            res.status(200).json(response);
            
        } catch (error) {
            next(error);
        }
    }
}