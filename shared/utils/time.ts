import { addDays, addHours, addMinutes, addSeconds, addYears, differenceInSeconds } from "date-fns";

type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "years";
type OutputUnit = "seconds" | "milliseconds";

interface ToTime {
    unit: TimeUnit;
    value: number;
    output?: OutputUnit;
}

export function toTime({ unit, value, output = "seconds" }: ToTime): number {
    const now = new Date();
    let target: Date;

    switch (unit) {
        case "seconds":
            target = addSeconds(now, value);
            break;
        case "minutes":
            target = addMinutes(now, value);
            break;
        case "hours":
            target = addHours(now, value);
            break;
        case "days":
            target = addDays(now, value);
            break;
        case "years":
            target = addYears(now, value);
            break;
        default:
            throw new Error("invalid unit");
    }

    const seconds = differenceInSeconds(target, now);
    return output === "milliseconds" ? seconds * 1000 : seconds;
}
