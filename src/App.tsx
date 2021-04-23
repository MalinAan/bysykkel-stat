import './App.css';
import data from "../src/trips.json";

const norwegianMonths = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

function App() {

    // Kan ha:
    // Gjennomsnittstur (lengde)
    // Mest populære stativ (topp 5?).
    // Vanligste tur
    // Lengste tur?
    // Kart over turer / Heatmap.
    // Hadde vært kult med noe visuelt på antall stasjoner.

    const numberOfTrips = data.length

    let years: { [key: string]: number } = {};
    let months: { [key: string]: number } = {};
    let stations: { [key: string]: number } = {};


    data.forEach(trip => {
        const date = new Date(trip._tripStarted)
        const year = date.getFullYear().toString();
        const month = norwegianMonths[date.getMonth()] + " " + year;
        const startStation = trip._startStation._title;
        const endStation = trip._endStation ? trip._endStation._title : trip._startStation._title;

        addToDictionary(years, year);
        addToDictionary(months, month);
        addToDictionary(stations, startStation);
        addToDictionary(stations, endStation);

    })

    function addToDictionary(dictionary: { [key: string]: number }, key: string | number) {
        const entryYear = dictionary[key];
        if (entryYear) {
            dictionary[key] = entryYear + 1;
        } else {
            dictionary[key] = 1;
        }
    }

    const monthsSortedDescendingTrips = Object.entries(months)
        .sort(([month1, numberOfTripsPerMonth1], [month2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    const stationsSortedDescendingTrips = Object.entries(stations)
        .sort(([station1, numberOfTripsPerMonth1], [station2, numberOfTripsPerMonth2]) => numberOfTripsPerMonth2 - numberOfTripsPerMonth1)

    console.log(monthsSortedDescendingTrips)
    return (
        <div className="App">
            <header className="App-header">
                <h2> Antall turer: {numberOfTrips}</h2>
                <tbody>
                <table className="styled-table">
                    <tr>
                        <th>År</th>
                        <th>Antall turer</th>
                    </tr>
                    {Object.entries(years).map(([year, numberOfTripsPerYear]) => (
                        <tr key={year}>
                            <td>{year}</td>
                            <td>{numberOfTripsPerYear}</td>
                        </tr>
                    ))}
                </table>
                </tbody>

                <h3> Mest populære måned var {monthsSortedDescendingTrips[0][0]},
                    med {monthsSortedDescendingTrips[0][1]} turer! </h3>
                <tbody>
                <table className="styled-table">
                    <tr>
                        <th>Måned</th>
                        <th>Antall turer</th>
                    </tr>
                    {Object.entries(months).map(([month, numberOfTripsPerMonth]) => (
                        <tr key={month}>
                            <td>{month}</td>
                            <td>{numberOfTripsPerMonth}</td>
                        </tr>
                    ))}
                </table>
                </tbody>

                <h3> Du har besøkt totalt {stationsSortedDescendingTrips.length} antall stasjoner!</h3>
                <tbody>
                <table className="styled-table">
                    <tr>
                        <th>Stasjoner</th>
                        <th>Antall ganger besøkt</th>
                    </tr>
                    {stationsSortedDescendingTrips.map(([month, numberOfTripsPerMonth]) => (
                        <tr key={month}>
                            <td>{month}</td>
                            <td>{numberOfTripsPerMonth}</td>
                        </tr>
                    ))}
                </table>
                </tbody>
            </header>
        </div>
    );
}

export default App;
