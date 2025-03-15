import { Response, Request } from "express";
import WeatherService from "../services/WeatherService.js";

class WeatherController {
    async getWeather(req: Request, res: Response) {
        const { body } = req;
        if (!body) {
            res.status(422).json({ message: 'Please provide proper payload! Body is missing' });
            return;
        }

        const { location } = body;
        if (!location) {
            res.status(422).json({ message: 'Please provide proper payload! Location is missing' });
            return;
        }
        const response = await WeatherService.getCachedWeather(location)
        res.json(response);
    }
}

export default new WeatherController();