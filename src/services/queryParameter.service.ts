
type QueryInfo = {
    parameterName: string;
    parameterType: string;
    paramterCount?: number;
    parameterRequired: boolean;
    parameterDefault?: string;
    parameterHelperText?: string;
}

type QueryInfoResponse = {
    count: number;
    queryInfo: QueryInfo[];
}


export class QueryParameterService {
    public static getQueryInfo(chartType: string): unknown {
        if (chartType === "timeBar" || chartType === 'line' || chartType === 'area') {
            const queryInfo: QueryInfoResponse = {
                count: 4,
                queryInfo: [
                    {
                        parameterName: "sourceName",
                        parameterType: "string",
                        parameterRequired: true
                    },
                    {
                        parameterName: "columns",
                        parameterType: "string[]",
                        parameterRequired: false,
                        parameterHelperText: "Give the columns comma seperated (don't include time field)"
                    },
                    {
                        parameterName: "timeField",
                        parameterType: "string",
                        parameterRequired: false,
                        parameterHelperText: "Give the time field"
                    },
                    {
                        parameterName: "orderBy",
                        parameterType: "string[]",
                        parameterRequired: false,
                        parameterHelperText: "Give the order by columns comma seperated"
                    },
                    {
                        parameterName: "limit",
                        parameterType: "number",
                        parameterRequired: false
                    },
                    // {
                    //     parameterName: "timeRange",
                    //     parameterType: "{from: string; to: string;}",
                    //     parameterRequired: false
                    // },
                    // {
                    //     parameterName: "filters",
                    //     parameterType: "[field: string; value: string; operator: string;]",
                    //     parameterRequired: false
                    // }
                ]
            }
            return queryInfo;
        } else if (chartType === "pie") {
            const queryInfo: QueryInfoResponse = {
                count: 3,
                queryInfo: [
                    {
                        parameterName: "sourceName",
                        parameterType: "string",
                        parameterRequired: true
                    },
                    {
                        parameterName: "aggregationType",
                        parameterType: "string",
                        parameterRequired: true,
                        parameterHelperText: "Give the aggregation type (sum, avg, count, min, max)"
                    },
                    {
                        parameterName: "columns",
                        parameterType: "string[]",
                        parameterRequired: false,
                        parameterHelperText: "Give the columns comma seperated"
                    }
                ]
            }
            return queryInfo;
        }
        else if(chartType === 'scatter') {
            const queryInfo: QueryInfoResponse = {
                count: 4,
                queryInfo: [
                    {
                        parameterName: "sourceName",
                        parameterType: "string",
                        parameterRequired: true
                    },
                    {
                        parameterName: "columns",
                        parameterType: "string[]",
                        paramterCount: 2,
                        parameterRequired: true,
                        parameterHelperText: "Give the columns comma seperated (2 columns)"
                    },
                    {
                        parameterName: "orderBy",
                        parameterType: "string[]",
                        parameterRequired: false,
                        parameterHelperText: "Give the order by columns comma seperated"
                    },
                    {
                        parameterName: "limit",
                        parameterType: "number",
                        parameterRequired: false
                    }
                ]
            }
            return queryInfo;
        }
    }
}