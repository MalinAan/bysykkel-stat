import './App.css';
import data from "./trips2.json";
import logo from "./svg/bysykkel-logo.svg";
import bike from "./svg/bike.svg";
import React from 'react';
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import {buildDataStructure, simpleDictionaryToSortedArray} from "./utils";

function App() {
    const [tripsData, setTripsData] = useState(data);

    const monthsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.months)
    const stationsSortedDescendingTrips = simpleDictionaryToSortedArray(bikeStats.stations)

    return (
        <div>
            <div className="header">
                <div>
                    <img className="header-logo" src={logo} alt="Header logo"/>
                </div>
                <div className="header-text">
                    <h1>Statistikk</h1>
                    <p>You clicked times</p>
                    <button
                        onClick={
                            () => setTripsData(data2)
                        }
                    >
                        Click me
                    </button>
                </div>
            </div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Dra trip.json hit</p> :
                        <p>Eller klikk for å velge filer</p>
                }
            </div>
            <Statistics tripsData={tripsData}/>
        </div>
    );
}

export default App;
