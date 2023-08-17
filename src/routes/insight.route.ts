import express from 'express';
import { InsightController } from '../controllers/insight.controller';

const insightRoute = express.Router();

insightRoute.get('/', InsightController.getInsights);

insightRoute.post('/', InsightController.addInsight);

export default insightRoute;