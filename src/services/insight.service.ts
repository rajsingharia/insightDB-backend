import { Insight } from "@prisma/client";
import prisma from "../config/database.config";
import { InsightDTO } from "../dto/request/insight.dto";


export class InsightService {

    private static prismaClient = prisma.getInstance();

    public static async getInsights(userId: string): Promise<Insight[]> {
        const insights = await this.prismaClient.insight.findMany({   
            where: {
                creatorId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return insights;
    }

    public static async addInsight(userId: string, insight: InsightDTO): Promise<string> {

        const newInsight = await this.prismaClient.insight.create({
            data: {
                title: insight.title,
                description: insight.description,
                inetgrationId: insight.integrationId,
                creatorId: userId,
                graphData: insight.graphData!,
                parameters: insight.parameters!
            }
        });

        return newInsight.id;
        
    }

}