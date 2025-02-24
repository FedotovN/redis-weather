import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
const envToConfigPath = {
    development: '.env.local',
    local: '.env.local',
    production: '.env',
}
const path = envToConfigPath[env];

const { error, parsed } = dotenv.config({ path });

if (error) {
    throw error;
}
const { PORT, API_KEY } = parsed;
export { PORT, API_KEY };