import createHttpError from "http-errors";
import prisma from "../config/database.config";
import { IntegrationDTO } from "../dto/request/integration.dto";
import { ListOfSupportedIntegrations } from "../util/constants";



export class IntegrationService {

    private static prismaClient = prisma.getInstance();

    public static async createIntegration(integration: IntegrationDTO): Promise<string> {
        const updatedUser = await this.prismaClient.integration.create({
            data: {
                name: integration.name,
                type: integration.type,
                credentials: integration.credentials 
            }
        });
        return updatedUser.id;
    }

    public static async updateIntegration(integrationId: string, integration: IntegrationDTO): Promise<string> {
        const updatedUser = await this.prismaClient.integration.update({
            where: {
                id: integrationId
            },
            data: {
                name: integration.name,
                type: integration.type,
                credentials: integration.credentials 
            }
        });
        return updatedUser.id;
    }

    public static async deleteIntegrationById(integrationId: string): Promise<string> {
        const deletedIntegration = await this.prismaClient.integration.delete({
            where: {
                id: integrationId
            }
        });
        return deletedIntegration.id;
    }

    public static async getSupportedIntegrations(): Promise<unknown> {
        return ListOfSupportedIntegrations;
    }

    public static async getIntegrationTypeByIntegrationId(integrationId: string): Promise<string> {
        const integration = await this.prismaClient.integration.findUnique({
            where: {
                id: integrationId
            }
        });
        if(!integration) throw createHttpError(404, "Integration not found");
        return integration.type;
    }
}

