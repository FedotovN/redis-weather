import { API_KEY } from '../env.js';
import { client } from "../caching/redis.client.js";

class WeatherService {
    async getWeather(location: string) {
        try {
            const parameters = {};
            const apiKey = API_KEY;
            const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices';
            const enpointUrl = 'rest/services/timeline';
            const unitGroup = 'us';
            const contentType = 'json';
            const queryParams = `unitGroup=${unitGroup}&contentType=${contentType}&key=${apiKey}`;
            const url = `${apiUrl}/${enpointUrl}/${location}?${queryParams}`;
            const response = await fetch(url, parameters);
            const value = await response.json();
            await this.cacheWeather(location, value);
            return value;
        } catch (e) {
            console.error(e);
        }
    }
    async getCachedWeather(location: string) {
        const value = await client.get(location);
        if (value) {
            return {
                data: JSON.parse(value),
                cached: true,
            }
        }
        return {
            data: await this.getWeather(location),
            cached: false,
        }
    }
    async cacheWeather(location: string, value: object) {
        await client.set(location, JSON.stringify(value));
        // Request for user location is cached for 12 hours
        await client.expire(location, 60 * 60 * 12);
    }
}

export default new WeatherService();