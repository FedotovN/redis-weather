export function getCelciusTemperature(temperature: number): string {
    const celciusTemperature = ((temperature - 32) * 5/9).toFixed(0);
    return celciusTemperature;
}