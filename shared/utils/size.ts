type SizeUnit = "bytes" | "kilobytes" | "megabytes" | "gigabytes" | "terabytes";
type OutputUnit = "bytes" | "bits";

interface ToSize {
    unit: SizeUnit;
    value: number;
    output?: OutputUnit;
}

const SIZE_MULTIPLIERS: Record<Exclude<SizeUnit, "bytes">, number> = {
    kilobytes: 1024,
    megabytes: 1024 ** 2,
    gigabytes: 1024 ** 3,
    terabytes: 1024 ** 4,
};

export function toSize({ unit, value, output = "bytes" }: ToSize): number {
    const bytes = unit === "bytes" ? value : value * SIZE_MULTIPLIERS[unit];
    return output === "bits" ? bytes * 8 : bytes;
}
