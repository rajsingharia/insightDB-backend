import express from 'express';
import ChartsController from '../controllers/charts.controller';

const chartsRoute = express.Router();

chartsRoute.get('/supported-charts', ChartsController.getAllCharts);

chartsRoute.get('/queries/:chartId', ChartsController.getChartQueries);

export default chartsRoute;