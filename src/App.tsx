import './App.css';
import data from "./trips.json";
import data2 from "./trips3.json";
import logo from "./svg/bysykkel-logo.svg";
import React, {useState, useCallback} from 'react';
import Statistics from "./Statistics";
import {useDropzone} from 'react-dropzone'

function App() {
    const [tripsData, setTripsData] = useState(data);
    const onDrop = useCallback(acceptedFiles => {
        const data = acceptedFiles;
        console.log(data);
        console.log()
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log("Inside onload!")
            if(typeof(binaryStr) === "string"){
                const jsonFile = JSON.parse(binaryStr)
                console.log("inside converrt!")
                setTripsData(jsonFile)
            }


        }
        reader.readAsText(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
