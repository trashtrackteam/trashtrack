import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

/**
 * PrismaService class that extends PrismaClient and implements OnModuleInit.
 * This class is responsible for initializing the Prisma client and connecting to the database.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    /**
     * Initializes the module.
     * @returns A promise that resolves when the module is initialized.
     */
    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    // async enableShutdownHooks(app: INestApplication): Promise<void> {
    //     this.$on("beforeExit", async () => {
    //         await app.close();
    //     });
    // }
}
