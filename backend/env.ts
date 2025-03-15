import dotenv from 'dotenv';

const env: string = process.env.NODE_ENV || 'development';
const envToConfigPath = {
    development: '.env.local',
    local: '.env.local',
    production: '.env',
}
const path = envToConfigPath[env as keyof typeof envToConfigPath];

const { error, parsed } = dotenv.config({ path });

if (error) {
    throw error;
}
const { PORT, API_KEY } = parsed as unknown as { PORT: number, API_KEY: string };
export { PORT, API_KEY };