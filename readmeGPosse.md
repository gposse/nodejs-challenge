# INTRODUCTION

This project implements an API of services for a simple inventory management application.

# HOW PROJECT WAS CREATED

The project was created using the followin components:

Express provides a set of features and tools that make it easier to handle HTTP requests, define routes, manage middleware, and render dynamic views. It allows you to create robust and scalable web applications by providing a simple and intuitive API.

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds static types to JavaScript, which can help developers catch errors at compile-time rather than at runtime.

Sequelize provides an ORM (Object-Relational Mapping) interface to the database tables and records used in this app.

Mysql2 is required by Sequelize to connect to a MySql database.

jsonwebtoken provides management for JWT token authentication.
 
# DECISIONS TAKEN BASED ON PROJECT DESCRIPTION

I received the following requirements:

1. Create a DB using your preferred DBMS. The "Id" field should be auto-incremental, and the properties should be the same as shown in the image. Additionally, you need to create a second table called "Fabrica" with "IdFab" as the primary key and foreign key of the "products" table. The other field in the "Fabrica" table should be "descripcion" and it should be of type text, containing the name of the product.
2. Create an endpoint in Node.js to GET all products grouped by "FabricID" ("IdFab").

I found this description a little confusing. The image seems to show a table with two different columns, "Id" and "IdFab", as auto-increment columns in the same table. Some DBMS do not allow having two auto-increment columns in the same table. I also don't think it's convenient in this case, since point No. 2 shows that different products can have the same "IdFab". What makes sense in this case is to have "IdFab" as auto-incremental in the "Fabrica" table, and "IdFab" as just a bigint with a foreign key reference to "Fabrica". That's how I implemented it.

The following is another requirement:

3. Create another endpoint, POST, to create a new product, it should insert a new
 product on the table “Productos” and “Fabrica”. The endpoint should validate each
 field and type, if creation is correct, you should send a “Status” field in response, with
 “true” Boolean value, and a “Payload” field with product information. If sent
 information is invalid related to types or missing fields, you should return a “400” error
 with a custom message saying “Missing information”.

In this case, it implies that there is always a 1-1 relationship between Products and Fabrica. This contradicts the previous requirement of grouping products by Fabrica in point No. 2. To fulfill the requirement and make the service more meaningful, the created POST service can receive an optional attribute IdFab. If it is received, it checks if it exists in the Fabrica table, and if it doesn't exist, it returns an error. If it is not received, then it fulfills the requirement of creating a record in Fabrica and associating the Id.

# APP EXECUTION

To implement the app with Docker, two containers are defined, one for the database and the other to run the NodeJs app. The following command should be executed:

1. Create a Docker network to allow containers see each other by http://<container name>

docker network create workana_network

2. Run the containers.

docker-compose -f docker-compose-mysql.yml up -d

It's important to wait until the mysql service is available

docker-compose -f docker-compose-node.yml up -d

The API should be now available in http://localhos:3000

# UNIT TEST EXECUTION

To execute the unit test, run the following commands:

sudo docker ps

Find the container Id for the image workana_app

sudo docker exec -it <container id> /bin/bashH

Once in the container shell:

npm run test

# POSTMAN

Postman collection is included in the file: WorkanaChallenge.postman_collection

# SWAGGER DOCS

Swagger documentation is included. Can be seen at:

http://localhost:3000/docs

