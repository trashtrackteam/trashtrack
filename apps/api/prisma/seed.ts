#!/usr/bin/env ts-node

import { $Enums, PrismaClient } from "@prisma/client";
import { hash } from "../src/util/encryption";

const prisma = new PrismaClient();
async function main() {
    const operators = [1, 2, 3, 4, 5].map(async (number) => {
        return await prisma.user.create({
            data: {
                name: `Operator ${number}`,
                username: `operator${number}`,
                password: await hash(`operator${number}`),
                phoneNumber: `+6281234567891${number}`,
                role: $Enums.Role.operator,
                active: true,
                description: null,
            },
        });
    });

    const admin = [1, 2, 3, 4, 5].map(async (number) => {
        return await prisma.user.create({
            data: {
                name: `Admin ${number}`,
                username: `admin${number}`,
                password: await hash(`admin${number}`),
                phoneNumber: `+6281234567892${number}`,
                role: $Enums.Role.admin,
                active: true,
                description: null,
            },
        });
    });

    console.log({ operators, admin });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
