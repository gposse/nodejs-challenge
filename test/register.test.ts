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

  test('Registering a user twice', async () => {
    // Simulate registering a user
    const user = {
      nombre: 'john_doe',
      contrasena: 'password123',
    };

    const res = await request(app)
      .post("/register")
      .send(user);

    expect(res.status).toBe(428);
  });

  afterAll(async () => {
    // Clean up the database after all tests have finished
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Usuarios where Nombre = "john_doe"');
    connection.release();
  });

});