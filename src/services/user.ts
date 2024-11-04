import { prisma } from '../libs/prisma';

export const getUserByEmailService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByIdService = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const createUserService = async (name: string, email: string) => {
  try {
    const user = await prisma.user.create({ data: { name, email } });

    return user;
  } catch (error) {
    return null;
  }
};
