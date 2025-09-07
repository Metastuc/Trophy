import { HttpError } from "#middleware/error.ts";

type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "years";
type OutputUnit = "seconds" | "milliseconds";

interface ToTime {
    unit: TimeUnit;
    value: number;
    output?: OutputUnit;
}

export function toTime({ unit, value, output = "seconds" }: ToTime): number {
    let seconds: number;

    switch (unit) {
        case "seconds":
            seconds = value;
            break;
        case "minutes":
            seconds = value * 60;
            break;
        case "hours":
            seconds = value * 60 * 60;
            break;
        case "days":
            seconds = value * 60 * 60 * 24;
            break;
        case "years":
            seconds = value * 60 * 60 * 24 * 365;
            break;
        default:
            throw new HttpError({ message: "invalid unit", code: 400 });
    }

    return output === "milliseconds" ? seconds * 1000 : seconds;
}
