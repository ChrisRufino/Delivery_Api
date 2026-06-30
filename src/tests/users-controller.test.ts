import request from 'supertest';
import { prisma } from '@/database/prisma';
import { app } from '@/app';

describe('UsersController', () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it('should create a new user sucessfully', async () => {
    const response = await request(app).post('/users').send({
      name: 'TestUser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    user_id = response.body.id;
  });

  it('should throw an error if user with same email already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'Duplicate user',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already in use');
  });

  it('should throw a validation error if email is invalid', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });
});
