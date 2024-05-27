import crypto from 'crypto';
import express from "express";
import jwt from 'jsonwebtoken';

import ProductoController from "../controllers/ProductoController";
import UsuarioController from "../controllers/UsuarioController";

const router = express.Router();

const secretKey = crypto.randomBytes(32).toString('hex');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
  
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: User authentication.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *               contrasena:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in.
   *       428:
   *         description: User already exists.
   */  
  router.post('/login',async (req: express.Request, res: express.Response) => {
    const ctl = new UsuarioController();
    const authorized = await ctl.login(req.body);
    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = req.body;
    const token = jwt.sign(user.nombre, secretKey);
  
    res.json({ token });
  });
  
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register a new user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *               contrasena:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registered successfully.
   *       428:
   *         description: User already exists.
   */
  router.post('/register', async (req: express.Request, res: express.Response) => {
    try {
      const ctl = new UsuarioController();
      await ctl.register(req.body);
      res.json({ status: 'OK', message: 'User registered successfully' });
    } catch (error: any) {
      return res.status(428).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /productos:
   *   get:
   *     summary: Get all products.
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of products.
   *       400:
   *         description: Error getting products.
   */
  router.get('/productos', authenticateToken, async (req: express.Request, res: express.Response) => {
    try {
      const ctl = new ProductoController();
      const list = await ctl.getAll();
      res.json(list);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /productos:
   *   post:
   *     summary: Add a new product.
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               Descripcion:
   *                 type: string
   *               Precio:
   *                 type: number
   *               Existencias:
   *                 type: number
   *     responses:
   *       200:
   *         description: Product added successfully.
   *       428:
   *         description: Error adding product.
   */
  router.post('/productos', authenticateToken, async (req: express.Request, res: express.Response) => {
    try {
      const ctl = new ProductoController();
      const p = await ctl.add(req.body);
      res.json(p);
    } catch (error: any) {
      return res.status(428).json({ error: error.message });
    }
  });
  
  /**
   * @swagger
   * /productos/{id}:
   *   delete:
   *     summary: Delete a product by Id.
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the product to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Product deleted successfully.
   *       400:
   *         description: Error deleting product.
   */
  router.delete('/productos/:id', authenticateToken, async (req: express.Request, res: express.Response) => {
    try {
      const ctl = new ProductoController();
      const productId = parseInt(req.params.id, 10);
      await ctl.delete(productId);
      res.json({ message: `Product with Id ${productId} has been deleted.` });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  });
  
export default router;