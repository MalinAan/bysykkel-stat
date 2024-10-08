import './App.css';
import React from 'react';
import {ResponsivePie} from '@nivo/pie'

interface Props {
    years: { [key: string]: number };
}

interface PieData {
    id: string;
    value: number;
    label: string;
}

const PieChart = (props: Props) => {
    const pies = Object.entries(props.years).map(([year, numberOfTrips]) => {
            const piePart: PieData =
                {
                    label: year,
                    id: year,
                    value: numberOfTrips
                }
            return piePart;
        }
    )
    return (
        <div className="pie-element">
            <ResponsivePie
                data={pies}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                //theme={{fontSize:14}}
                activeOuterRadiusOffset={8}
                colors={{scheme: 'red_yellow_green'}}
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['darker', 0]]}}
                arcLinkLabelsSkipAngle={0}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={4}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                isInteractive={true}
                legends={[]}
            />
        </div>
    )
}


export default PieChart;
