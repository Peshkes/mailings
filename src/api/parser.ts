export function timestampToString(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16);
}

export function timestampToDate(timestamp: number): Date {
    return new Date(timestamp);
}

export function timestampToDateFormatted(timestamp: number | null): string {
    if (timestamp === null) return '';
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export function stringToTimestamp(dateString: string): number {
    return new Date(dateString).getTime();
}

export function dateToTimestamp(date: Date): number {
    return date.getTime();
}