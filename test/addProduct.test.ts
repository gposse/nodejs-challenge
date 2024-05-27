import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import mysql from 'mysql2/promise';
import { afterAll } from '@jest/globals';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

describe('User Registration', () => {
  let token: string = '';

  test('Registering a user', async () => {
    // Simulate registering a user
    const user = {
      nombre: 'john_doe',
      contrasena: 'password123',
    };

    const res = await request(app)
      .post("/register")
      .send(user);

    expect(res.status).toBe(200);
  });

  test('Authenticate user', async () => {
    // Simulate registering a user
    const user = {
      nombre: 'john_doe',
      contrasena: 'password123',
    };

    const res = await request(app)
      .post("/login")
      .send(user);

    expect(res.status).toBe(200);

    token = res.body.token;
  });

  test('Add a new product', async () => {
    const product = {
      Descripcion: 'Product1',
      Precio: 1000,
      Existencias: 10
    };

    const res = await request(app)
      .post("/productos")
      .set('Authorization', `Bearer ${token}`)
      .send(product);

    expect(res.status).toBe(200);

    token = res.body.token;
  });

  afterAll(async () => {
    // Clean up the database after all tests have finished
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Productos where Descripcion = "Product1"');
    await connection.query('DELETE FROM Fabricas where Descripcion = "Product1"');
    await connection.query('DELETE FROM Usuarios where nombre = "john_doe"');
    connection.release();
  });

});