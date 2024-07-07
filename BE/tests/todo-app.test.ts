import request from 'supertest';
import app from '../src/app';
import { initializeDatabase } from '../src/db';

beforeAll(async () => {
  await initializeDatabase();
});

describe('Todo API', () => {
  let todoId: string;

  it('should create a new todo', async () => {
    const res = await request(app).post('/todos').send({
      title: 'Test Todo',
      content: 'This is a test todo',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    todoId = res.body.id;
  });

  it('should fetch all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a todo by id', async () => {
    const res = await request(app).get(`/todos/${todoId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', todoId);
  });

  it('should update a todo', async () => {
    const res = await request(app).put(`/todos/${todoId}`).send({
      title: 'Updated Test Todo',
      content: 'This is an updated test todo',
      complete: true,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('complete', true);
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for a non-existing todo', async () => {
    const res = await request(app).get(`/todos/${todoId}`);
    expect(res.status).toBe(404);
  });
});
