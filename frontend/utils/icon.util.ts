import { ICON_TO_EMOJI } from "../const/icons.const";

export function getDayIcon(icon: string): string {
    return ICON_TO_EMOJI[icon];
}