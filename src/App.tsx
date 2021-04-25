import './App.css';
import data from "./trips.json";
import logo from "./svg/bysykkel-logo.svg";
import bike from "./svg/bike.svg";
import React from 'react';
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import {DetailedMonthData} from "./types";
import {buildDataStructure, simpleDictionaryToSortedArray} from "./utils";

function App() {
    const numberOfTrips = data.length
    let months: { [key: string]: number } = {};
    let stations: { [key: string]: number } = {};
    let detailedMonthsData: { [key: string]: DetailedMonthData } = {};
    let years: { [key: string]: number } = {};

    buildDataStructure(years, months, stations, detailedMonthsData);

    const monthsSortedDescendingTrips = simpleDictionaryToSortedArray(months)
    const stationsSortedDescendingTrips = simpleDictionaryToSortedArray(stations)

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
            <div className="popular-month">
                <div className="popular-month-text">
                    <h3> Din mest populære måned var <span
                        className="coloured"> {monthsSortedDescendingTrips[0][0].toLowerCase()},
                            </span> med {monthsSortedDescendingTrips[0][1]} turer.</h3>
                </div>
                <LineChart years={years} monthsData={detailedMonthsData}/>

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
