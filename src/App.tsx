import './App.css';
import data from "../src/trips.json";
import logo from "./bysykkel-logo.svg";
import bike from "./bike.svg";
import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'
import PieChart from "./PieChart";


const norwegianMonths = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

interface MonthData {
    monthNumber: number;
    monthName: string;
    year: number;
    trips: number;
    date: Date;
    yearString: string;
}


let monthsData:  { [key: string]: MonthData } = {};
let years: { [key: string]: number } = {};

function getAllMonthsInYearArray(){
    interface LinesDataToYears {
        id: string;
        color: string;
        data: LineChartData[]
    }

    interface LineChartData {
        x: string; // Month
        y: number; // Trips
    }

    let allYearsWithMonths:LinesDataToYears[]= Object.entries(years).map(([year, _]) =>

        {
            let emptyMonths: LineChartData[] = norwegianMonths.map(month =>
                {
                    return {x: month, y: 0}
                }
            )
            return {
                id: year,
                color: "red",
                data: emptyMonths
            }

        }
    )

    Object.entries(monthsData).forEach(([monthKey, monthData]) => {
        let year = allYearsWithMonths.find(y => y.id == monthData.yearString);
        if(year) {
            let month = year.data.find(m => m.x == monthData.monthName)
            if(month) {
                month.y = monthData.trips;
            }
        }}
    )

    return allYearsWithMonths
}

function App() {

    const numberOfTrips = data.length
    let months: { [key: string]: number } = {};
    let stations: { [key: string]: number } = {};


    interface LineChartData {
        x: string; // Month
        y: number; // Trips
    }

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
        .sort(([month1, numberOfTripsPerMonth1], [month2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    const stationsSortedDescendingTrips = Object.entries(stations)
        .sort(([station1, numberOfTripsPerMonth1], [station2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    return (

            <div className="container">
                <div className="header">
                    <div>
                        <img className="header-logo" src={logo}/>
                    </div>
                    <div className="header-text">
                        <h1>Statistikk</h1>
                    </div>
                </div>

                <div className="trips-element">
                    <div className="trips-text">
                    <h3 className="non-coloured"> Du har syklet totalt</h3>
                    <h2 className="coloured"> {numberOfTrips} turer</h2>
                        <PieChart years={years}/>
                    </div>

                </div>
                <div className="info-element">
                    <div className="month-text">
                        <h3> Din mest populære måned var <span className="coloured"> {monthsSortedDescendingTrips[0][0].toLowerCase()},
                            </span> med {monthsSortedDescendingTrips[0][1]} turer.</h3>
                        <h3 className="coloured"></h3>
                    </div>
                    <div className="line-chart-element">
                        <ResponsiveLine
                            data={getAllMonthsInYearArray()}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                            yFormat=" >-.2f"
                            curve="basis"
                            axisTop={null}
                            axisRight={null}
                            lineWidth={6}
                            axisBottom={{
                                orient: 'bottom',
                                tickSize: 4,
                                tickPadding: 4,
                                tickRotation: 0,
                                legend: '',
                                legendOffset: -60,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Antall turer',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            enableGridX={false}
                            enableGridY={false}
                            colors={{scheme:"red_yellow_green"}}
                            enablePoints={false}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                            pointLabelYOffset={-12}
                            areaOpacity={0.15}
                            isInteractive={true}
                            legends={[{
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',}]}
                        />
                    </div>

                </div>
                <div className="number-of-stations">
                    <h2 className="number-of-stations-heading"> Du har besøkt {stationsSortedDescendingTrips.length} ulike stasjoner.</h2>
                    <img className="bike-logo" src={bike}/>
                </div>
                <div className="top-5">
                    <h2>Topp 5 stasjoner</h2>
                    <tbody>
                    <table className="styled-table">
                        {stationsSortedDescendingTrips.slice(0,5).map(([month, numberOfTripsPerMonth], index) => (
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
