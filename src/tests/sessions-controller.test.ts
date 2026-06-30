import request from 'supertest';
import { prisma } from '@/database/prisma';
import { app } from '@/app';

describe('sessionsController', () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it('should authenticate a and get acess token', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'Test User',
      email: 'tesstuser@example.com',
      password: 'password123',
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'tesstuser@example.com',
      password: 'password123',
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
