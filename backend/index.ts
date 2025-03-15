import express from 'express';
import { PORT } from './env.js';
import cors from 'cors';
import WeatherRouter from "./routers/WeatherRouter.js";
import {client} from "./caching/redis.client.js";

const app = express();

async function connectRedis() {
    await client.connect();
    console.log('Redis Connected ✅ ');
}

function setupPlugins() {
    app.use(express.json());
    app.use(cors());
}

function setupRouting() {
    app.use('/api/weather/', WeatherRouter);
}

async function startApp() {
    setupPlugins();
    setupRouting();
    await connectRedis();
    app.listen(PORT);
}

startApp();