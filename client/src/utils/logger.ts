export function logger(...args: any[]) {
    console.log();
    console.log();
    console.log();

    if (import.meta.env.DEV) {
        console.log(...args);
    }

    console.log();
    console.log();
    console.log();
}
