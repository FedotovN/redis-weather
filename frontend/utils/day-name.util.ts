import { MONTH_NUMBER_TO_NAME } from "../const/month-name.const";

export function getDayName(datetime: string): string {
    const [year, month, day] = datetime.split("-");
    const name = MONTH_NUMBER_TO_NAME[Number(month)];
    return `${name}, ${day}`;
}