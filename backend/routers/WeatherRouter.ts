import { Router } from "express";
import WeatherController from "../controllers/WeatherController.js";

const router = new Router();

router.post('/condition', WeatherController.getWeather.bind(WeatherController));

export default router;