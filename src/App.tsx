import './App.css';
import data from "./trips.json";
import logo from "./svg/bysykkel-logo.svg";
import bike from "./svg/bike.svg";
import React from 'react';
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import {buildDataStructure, simpleDictionaryToSortedArray} from "./utils";

function App() {
    const bikeStats = buildDataStructure(data);

    const monthsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.months)
    const stationsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.stations)

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
                    <h2>Du har syklet totalt <em className="extra-emphasis">{bikeStats.numberOfTrips} turer</em></h2>
                    <PieChart years={bikeStats.years}/>
                </div>

            </div>
            <div className="popular-month">
                <h2>Din mest populære måned var <em> {monthsSortedDescendingTrips[0][0].toLowerCase()},
                </em> med {monthsSortedDescendingTrips[0][1]} turer.</h2>
                <LineChart years={bikeStats.years} monthsData={bikeStats.detailedMonthsData}/>

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
