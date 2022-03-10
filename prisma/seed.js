const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require("../src/server/utils/faker");

const createAdmin = async () => {
    const admins = [];
    const MAX_NUMBER_ADMINS_TO_GENERATE = 10;

    for (let i = 0; i < MAX_NUMBER_ADMINS_TO_GENERATE; i++) {
        const fakeAdmin = faker.createFakeAdmin();

        const admin = await prisma.admin.create({
            data: {
                username: fakeAdmin.username,
                password: fakeAdmin.password,
                email: fakeAdmin.email
            }
        });
        admins.push(admin);
    }
    return admins
}

const seed = async () => {
    await createAdmin();

    process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));