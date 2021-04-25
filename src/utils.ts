import {DetailedMonthData, norwegianMonths} from "./types";

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

export function simpleDictionaryToSortedArray(dict: { [key: string]: number }) {
    return Object.entries(dict)
        .sort(([, numberOfTrips1], [, numberOfTrips2]) =>
            numberOfTrips2 - numberOfTrips1)

}