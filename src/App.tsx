import './App.css';
import data from "../src/trips.json";
import logo from "./bysykkel-logo.svg";
import bike from "./bike.svg";
import React from 'react';
import PieChart from "./PieChart";
import LineChart from "./LineChart";


const norwegianMonths = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

interface MonthData {
    monthNumber: number;
    monthName: string;
    year: number;
    trips: number;
    date: Date;
    yearString: string;
}


let monthsData: { [key: string]: MonthData } = {};
let years: { [key: string]: number } = {};


function App() {

    const numberOfTrips = data.length
    let months: { [key: string]: number } = {};
    let stations: { [key: string]: number } = {};


    function addToDictionary(dictionary: { [key: string]: number }, key: string | number) {
        const entryYear = dictionary[key];
        if (entryYear) {
            dictionary[key] = entryYear + 1;
        } else {
            dictionary[key] = 1;
        }
    }


    data.forEach(trip => {
        const date = new Date(trip._tripStarted)
        const year = date.getFullYear().toString();
        const month = norwegianMonths[date.getMonth()] + " " + year;
        const mmyyyy = date.getMonth() + " " + year;
        const startStation = trip._startStation._title;
        const endStation = trip._endStation ? trip._endStation._title : trip._startStation._title;

        addToDictionary(years, year);
        addToDictionary(months, month);
        addToDictionary(stations, startStation);
        addToDictionary(stations, endStation);

        const entryMonth = monthsData[mmyyyy];
        if (entryMonth) {
            monthsData[mmyyyy].trips = monthsData[mmyyyy].trips + 1;
        } else {
            monthsData[mmyyyy] = {
                year: date.getFullYear(),
                yearString: year,
                monthName: norwegianMonths[date.getMonth()],
                trips: 1,
                monthNumber: date.getMonth() + 1,
                date: date
            }

        }

    })
    const monthsSortedDescendingTrips = Object.entries(months)
        .sort(([month1, numberOfTripsPerMonth1], [_, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    const stationsSortedDescendingTrips = Object.entries(stations)
        .sort(([station1, numberOfTripsPerMonth1], [_, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    return (

        <div className="container">
            <div className="header">
                <div>
                    <img className="header-logo" src={logo} alt="Header logo"/>
                </div>
                <div className="header-text">
                    <h1>Statistikk</h1>
                </div>
            </div>

            <div className="trips-element">
                <div className="trips-text">
                    <h3> Du har syklet totalt</h3>
                    <h2 className="coloured"> {numberOfTrips} turer</h2>
                    <PieChart years={years}/>
                </div>

            </div>
            <div className="info-element">
                <div className="month-text">
                    <h3> Din mest populære måned var <span
                        className="coloured"> {monthsSortedDescendingTrips[0][0].toLowerCase()},
                            </span> med {monthsSortedDescendingTrips[0][1]} turer.</h3>
                </div>
                <LineChart years={years} monthsData={monthsData}/>

            </div>
            <div className="number-of-stations">
                <h2 className="number-of-stations-heading"> Du har besøkt {stationsSortedDescendingTrips.length} ulike
                    stasjoner.</h2>
                <img className="bike-logo" src={bike} alt="Bike"/>
            </div>
            <div className="top-5">
                <h2>Topp 5 stasjoner</h2>
                <tbody>
                <table className="styled-table">
                    {stationsSortedDescendingTrips.slice(0, 5).map(([month, numberOfTripsPerMonth]) => (
                        <tr key={month}>
                            <td className="td-month">{month}</td>
                            <td>{numberOfTripsPerMonth}</td>
                        </tr>
                    ))}
                </table>
                </tbody>
            </div>
        </div>

    );
}

export default App;
