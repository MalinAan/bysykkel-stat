import './App.css';
import data from "../src/trips.json";
import React from 'react';


const norwegianMonths = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

function App() {

    // Kan ha:
    // Gjennomsnittstur (lengde)
    // Vanligste tur
    // Lengste tur?
    // Kart over turer / Heatmap.
    // Hadde vært kult med noe visuelt på antall stasjoner.

    const numberOfTrips = data.length

    let years: { [key: string]: number } = {};
    let months: { [key: string]: number } = {};
    let stations: { [key: string]: number } = {};


    data.forEach(trip => {
        const date = new Date(trip._tripStarted)
        const year = date.getFullYear().toString();
        const month = norwegianMonths[date.getMonth()] + " " + year;
        const startStation = trip._startStation._title;
        const endStation = trip._endStation ? trip._endStation._title : trip._startStation._title;

        addToDictionary(years, year);
        addToDictionary(months, month);
        addToDictionary(stations, startStation);
        addToDictionary(stations, endStation);

    })

    function addToDictionary(dictionary: { [key: string]: number }, key: string | number) {
        const entryYear = dictionary[key];
        if (entryYear) {
            dictionary[key] = entryYear + 1;
        } else {
            dictionary[key] = 1;
        }
    }

    const monthsSortedDescendingTrips = Object.entries(months)
        .sort(([month1, numberOfTripsPerMonth1], [month2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    const stationsSortedDescendingTrips = Object.entries(stations)
        .sort(([station1, numberOfTripsPerMonth1], [station2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <div className="header-logo">
            <svg viewBox="0 0 33 24" width="347" height="347" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="a" d="M14.963.13v15.31H.01V.13h14.953z"></path>
                    <path id="c" d="M.026.141h12.5v4.465H.026V.14z"></path>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(17.919 8.42)">
                        <mask id="b" fill="#fff"></mask>
                        <path
                            d="M7.487 3.659c-2.223 0-4.03 1.85-4.03 4.126 0 2.275 1.807 4.126 4.03 4.126 2.222 0 4.03-1.85 4.03-4.126 0-2.275-1.808-4.126-4.03-4.126m0 11.78C3.364 15.44.01 12.006.01 7.785.01 3.565 3.364.131 7.487.131c4.122 0 7.476 3.433 7.476 7.654 0 4.22-3.354 7.654-7.476 7.654"
                            fill="currentColor"></path>
                    </g>
                    <path
                        d="M7.477 12.078c-2.222 0-4.03 1.85-4.03 4.126 0 2.275 1.808 4.126 4.03 4.126 2.223 0 4.03-1.85 4.03-4.126 0-2.275-1.807-4.126-4.03-4.126m0 11.78C3.354 23.859 0 20.426 0 16.205c0-4.22 3.354-7.655 7.477-7.655s7.477 3.434 7.477 7.655c0 4.22-3.354 7.655-7.477 7.655M13.033 6.534H7.006c-.956 0-1.73-.793-1.73-1.771 0-.978.774-1.771 1.73-1.771h6.027c.956 0 1.73.793 1.73 1.77 0 .979-.774 1.772-1.73 1.772"
                        fill="currentColor"></path>
                    <g transform="translate(17.321 .011)">
                        <mask id="d" fill="#fff">
                        </mask>
                        <path
                            d="M6.261 4.606a13.07 13.07 0 0 1-5.177-1.06C.206 3.17-.207 2.136.16 1.237A1.71 1.71 0 0 1 2.415.291a9.71 9.71 0 0 0 3.846.787A9.713 9.713 0 0 0 10.133.28a1.709 1.709 0 0 1 2.257.94c.37.898-.041 1.933-.918 2.312a13.072 13.072 0 0 1-5.21 1.074"
                            fill="currentColor" ></path>
                    </g>
                </g>
            </svg>
                    </div>
                    <div className="header-text">
                        <h1>Statistikk</h1>
                    </div>

                </div>

                <div className="info-element">
                    <h2> Antall turer: {numberOfTrips}</h2>
                    <tbody>

                    <table className="styled-table">
                        <tr>
                            <th>År</th>
                            <th>Antall turer</th>
                        </tr>
                        {Object.entries(years).map(([year, numberOfTripsPerYear]) => (
                            <tr key={year}>
                                <td>{year}</td>
                                <td>{numberOfTripsPerYear}</td>
                            </tr>
                        ))}
                    </table>
                    </tbody>
                </div>
                <div className="info-element">
                    <h3> Mest populære måned var {monthsSortedDescendingTrips[0][0]},
                        med {monthsSortedDescendingTrips[0][1]} turer! </h3>
                    <tbody>
                    <table className="styled-table">
                        <tr>
                            <th>Måned</th>
                            <th>Antall turer</th>
                        </tr>
                        {Object.entries(months).map(([month, numberOfTripsPerMonth]) => (
                            <tr key={month}>
                                <td>{month}</td>
                                <td>{numberOfTripsPerMonth}</td>
                            </tr>
                        ))}
                    </table>
                    </tbody>
                </div>
                <div className="info-element">
                    <h3> Du har besøkt totalt {stationsSortedDescendingTrips.length} antall stasjoner!</h3>
                    <tbody>
                    <table className="styled-table">
                        <tr>
                            <th>Stasjoner</th>
                            <th>Antall ganger besøkt</th>
                        </tr>
                        {stationsSortedDescendingTrips.map(([month, numberOfTripsPerMonth]) => (
                            <tr key={month}>
                                <td>{month}</td>
                                <td>{numberOfTripsPerMonth}</td>
                            </tr>
                        ))}
                    </table>
                    </tbody>
                </div>
            </div>
        </div>
    );
}

export default App;
