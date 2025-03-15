import { createClient } from "redis";

export const client = createClient();

client.on("error", (err: Error) => {
    console.error('Redis Error:', err);
})