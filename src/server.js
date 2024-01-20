import { ApolloServer } from "apollo-server-express";
import schema from "./graphQL/schema.js";
import winston from "winston";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { getCurrentUser } from "./controllers/authController.js";
import errorHandler from "./helpers/errorHandler.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// global error handler
app.use(errorHandler);

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      let accessToken = null;
      let currentUser = null;
      try {
        accessToken = req.headers.authorization;
        if (accessToken) {
          currentUser = await getCurrentUser(accessToken);
        }
      } catch (err) {
        console.error(`Unable to authenticate user with token:${err}`);
      }

      return { currentUser };
    },
    introspection: true,
    playground: false,
    persistedQueries: false
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  process.on("uncaughtException", function (err) {
    logger.error({
      message: `uncaughtException: ${err.message}`,
      time: new Date()
    });
  });
  process.on("unhandledRejection", function (reason) {
    logger.error({
      message: `unhandledRejection: ${reason.message}`,
      time: new Date()
    });
  });

  app.use("/public", express.static(path.join(__dirname, "../../app/public")));
  app.use(express.static(path.join(__dirname, '../../app')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../app', 'index.html'))
  });

  await new Promise((resolve) => app.listen({ port: 8080 }, resolve));
  console.log(`Server running at http://localhost:8080${server.graphqlPath}`);
}
startApolloServer();
