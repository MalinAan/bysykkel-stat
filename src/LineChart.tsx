import './App.css';
import data from "../src/trips.json";
import logo from "./bysykkel-logo.svg";
import bike from "./bike.svg";
import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

interface Props {
    years: { [key: string]: number };
    monthsData:  { [key: string]: MonthData }
}

interface LinesDataToYears {
    id: string;
    color: string;
    data: LineChartData[]
}

interface LineChartData {
    x: string; // Month
    y: number; // Trips
}
const norwegianMonths = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];


interface MonthData {
    monthNumber: number;
    monthName: string;
    year: number;
    trips: number;
    date: Date;
    yearString: string;
}
const LineChart = (props: Props) => {

    function getAllMonthsInYearArray(){


        let allYearsWithMonths:LinesDataToYears[]= Object.entries(props.years).map(([year, _]) =>

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

        Object.entries(props.monthsData).forEach(([monthKey, monthData]) => {
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
    return ( <div className="line-chart-element">
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
    </div>);
}


export default LineChart;