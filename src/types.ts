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

export interface BikeStats {
    years: { [key: string]: number };
    months: { [key: string]: number };
    stations: { [key: string]: number };
    detailedMonthsData: { [key: string]: DetailedMonthData };
    numberOfTrips: number;
}