import './App.css';
import React from 'react';
import {buildDataStructure, simpleDictionaryToSortedArray} from "./utils";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import bike from "./svg/bike.svg";


interface Props {
    tripsData: any;
}

const Statistics = (props: Props) => {
    const bikeStats = buildDataStructure(props.tripsData);
    const monthsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.months)
    const stationsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.stations)

    return (
        <div className="container">
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

                <table className="styled-table">
                    <tbody>
                    <tr>
                        <th className="td-header">Topp 5 stasjoner</th>
                    </tr>
                    {stationsSortedDescendingTrips.slice(0, 5).map(([month, numberOfTripsPerMonth]) => (
                        <tr key={month}>
                            <td className="td-month">{month}</td>
                            <td>{numberOfTripsPerMonth}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Statistics;