import { sequelize } from "./model";
import * as bodyParser from "body-parser";
import Router from "./routes";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/index.ts'], 
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

sequelize.sync().then(() => {
  console.log("Tables created successfully.");
}).catch(error => {
  console.error("Error creating tables: ", error);
});

const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use(Router);

export default app;
