
import './App.css';
import data from "../src/trips.json";



function App() {
  //var data = import("../src/trips.json")
  console.log(data)
  var numberOfTrips = data.length
  var dates = new Map<string, number>();

  /*data.forEach(trip => {
    date = Date.parse(trip._tripStarted)
    year = date.year
    //month = date.month

    if (dates.)
  })*/

  return (
    <div className="App">
      <header className="App-header">

        <p>
          Antall turer: {numberOfTrips}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
