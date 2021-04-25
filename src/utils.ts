import {DetailedMonthData, norwegianMonths} from "./types";
import data from "./trips.json";

export function addTripToSimpleDictionary(dictionary: { [key: string]: number }, key: string | number) {
    const entryYear = dictionary[key];
    if (entryYear) {
        dictionary[key] = entryYear + 1;
    } else {
        dictionary[key] = 1;
    }
}

export function addTripToDetailedMonthsDataDictionary(monthsData: { [p: string]: DetailedMonthData }, key: string, date: Date, year: string) {
    const entryMonth = monthsData[key];
    if (entryMonth) {
        monthsData[key].trips = monthsData[key].trips + 1;
    } else {
        monthsData[key] = {
            year: date.getFullYear(),
            yearString: year,
            monthName: norwegianMonths[date.getMonth()],
            trips: 1,
            monthNumber: date.getMonth() + 1,
            date: date
        }
    }
}

export function buildDataStructure(
    years: { [key: string]: number },
    months: { [key: string]: number },
    stations: { [key: string]: number },
    detailedMonthsData: { [key: string]: DetailedMonthData }) {
    data.forEach(trip => {
        const date = new Date(trip._tripStarted)
        const year = date.getFullYear().toString();
        const month = norwegianMonths[date.getMonth()] + " " + year;
        const mmyyyy = date.getMonth() + " " + year;
        const startStation = trip._startStation._title;
        const endStation = trip._endStation ? trip._endStation._title : trip._startStation._title;

        addTripToSimpleDictionary(years, year);
        addTripToSimpleDictionary(months, month);
        addTripToSimpleDictionary(stations, startStation);
        addTripToSimpleDictionary(stations, endStation);
        addTripToDetailedMonthsDataDictionary(detailedMonthsData, mmyyyy, date, year)
    })
}

export function simpleDictionaryToSortedArray(dict: { [key: string]: number }) {
    return Object.entries(dict)
        .sort(([, numberOfTrips1], [, numberOfTrips2]) =>
            numberOfTrips2 - numberOfTrips1)

}