import { NextFunction, Request, Response } from "express";
import ChartsService from "../services/charts.service";
import { QueryService } from "../services/query.service";


interface IGetChartQueriesRequest extends Request {
    params: {
        chartId: string;
    }
}

export default class ChartsController {
    public static getAllCharts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await ChartsService.getAllCharts();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    public static getChartQueries = async (req: IGetChartQueriesRequest, res: Response, next: NextFunction) => {
        try {
            const chartId = Number(req.params.chartId);
            if(isNaN(chartId) || chartId == 0) throw new Error("Invalid chart id");
            const chartDetails = await ChartsService.getChartDetails(chartId);
            const response = await QueryService.getQueryInfo(chartDetails.value);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}