export const norwegianMonths =
    ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

export interface DetailedMonthData {
    monthNumber: number;
    monthName: string;
    year: number;
    trips: number;
    date: Date;
    yearString: string;
}