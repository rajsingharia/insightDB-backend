import { SupportedCharts } from "../util/constants"


export default class ChartsService {

    public static getAllCharts = () => {
        return {
            defaultChart: SupportedCharts[0],
            supportedCharts: SupportedCharts,
        }
    }

    public static getChartDetails = (chartId: number) => {
        const chartDetails = SupportedCharts.find((chart) => chart.id === chartId);
        if (chartDetails) {
            return chartDetails;
        }
        else {
            throw new Error("Chart not found");
        }
    }
}