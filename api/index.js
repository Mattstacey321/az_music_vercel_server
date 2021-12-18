import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import dbConnection from '../config/db_connection.js';
import resolvers from '../resolvers/resolvers.js';
import typeDefs from "../schema/typeDefs.js";


const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
    const server = new ApolloServer({
        typeDefs, resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    dbConnection();
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;