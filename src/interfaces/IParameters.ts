
export interface IParameters {
    sourceName?: string;
    columns?: string[];
    orderBy?: string[];
    limit?: string;
    timeRange?: {
        from: string;
        to: string;
    },
    aggregationType?: string;
}