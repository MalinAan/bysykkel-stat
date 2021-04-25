import './App.css';
import data from "./trips.json";
import data2 from "./trips3.json";
import React, {useState, useCallback} from 'react';
import Statistics from "./Statistics";
import {useDropzone} from 'react-dropzone'
import Header from "./Header";

function App() {
    const [tripsData, setTripsData] = useState(data);
    const [showStatistics, setPage] = useState(false);
    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        reader.onabort = () => console.log('File reading was aborted')
        reader.onerror = () => console.log('File reading has failed')
        reader.onload = () => {
            const textResult = reader.result
            if(typeof(textResult) === "string"){
                const jsonFile = JSON.parse(textResult)
                setTripsData(jsonFile)
            }
        }
        reader.readAsText(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div>
            <Header/>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Dra trip.json hit</p> :
                        <p>Eller klikk for å velge filer</p>
                }
            </div>

            {showStatistics && <Statistics tripsData={tripsData}/>}
        </div>
    );
}

export default App;
