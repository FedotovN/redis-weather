import { createClient } from "redis";
import { REDIS_URL } from "../env.js";

export const client = createClient({
    url: REDIS_URL
});

client.on("error", (err: Error) => {
    console.error('Redis Error:', err);
})