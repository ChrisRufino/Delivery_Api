import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { prisma } from '../database/prisma';
import { AppError } from '../utils/AppError';

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { name, email, password } = bodySchema.parse(request.body);

    const userWhhithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWhhithSameEmail) {
      throw new AppError('Email already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    // Here you would typically save the user to the database using an ORM like Prisma or Sequelize.

    return response.status(201).json(userWithoutPassword);
  }
}

export { UsersController };
