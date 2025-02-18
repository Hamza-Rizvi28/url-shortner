import prisma from './prisma';

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email: string, username: string, hashedPassword: string) => {
    return prisma.user.create({
        data: { email: email, username: username, password: hashedPassword },
    });
};