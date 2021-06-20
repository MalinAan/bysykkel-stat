import './App.css';
import data from "./trips.json";
import React, {useCallback, useState} from 'react';
import Statistics from "./Statistics";
import {useDropzone} from 'react-dropzone'
import Header from "./Header";
import Footer from "./Footer";
import {Link, Route, useHistory, Switch} from "react-router-dom";

function App() {
    const history = useHistory();
    const [tripsData, setTripsData] = useState(data);
    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();
        reader.onload = () => {
            const textResult = reader.result;
            if (typeof (textResult) === "string") {
                const jsonFile = JSON.parse(textResult);
                setTripsData(jsonFile);
                history.push('/statistikk');
            }
        };
        reader.readAsText(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/statistikk">
                    <Statistics tripsData={tripsData}/>
                </Route>
                <Route>
                    <div className="pre-page">
                        <div className="download-data-guide">
                            <h3>Last opp din data</h3>
                            <ol>
                                <li>Logg inn med din bruker på oslobysykkel.no.</li>
                                <li>Trykk på “Dine data”.</li>
                                <li>Trykk på “Lag nye filer”.</li>
                                <li>Trykk på “Lag JSON-filer”.</li>
                                <li>Når den er klar, trykk “LAST NED FIL”.</li>
                                <li>Åpne zip-filen.</li>
                                <li>Last opp kun trips.json.</li>
                            </ol>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Dra trip.json hit</p> :
                                        <button>Last opp trips.json</button>
                                }
                            </div>
                        </div>
                        <div className="example-stat">
                            <h3>... eller se eksempel på statistikk her</h3>
                            <Link to="/statistikk">
                                <button>Se eksempelstatistikk</button>
                            </Link>
                        </div>

                    </div>
                </Route>
            </Switch>
            <Footer/>
        </>
    );
}

export default App;
