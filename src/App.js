import {useEffect, useState} from 'react';
import './App.css';

function App() {
      const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2022-01-01&limit=20"
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data.features.map(earthquake => ({
              id: earthquake.id, 
              place: earthquake.properties.place, 
              magnitude: earthquake.properties.mag, 
              time: (new Date(earthquake.properties.time).toLocaleString()),
              })
          ))
        }).catch(e=>console.log(e));
    }, []);
  
    return <div className="App">
      {data.map(earthquake => {
        return <div  key={earthquake.id} className='card'>
            <div className="mag" style={{ backgroundColor: `rgba(255, 0, 0, ${earthquake.magnitude*0.2})`}}>
                <h1>
                  {earthquake?.magnitude.toFixed(2)}
                </h1>
            </div>
            <div className="cont">
              <h2>{earthquake?.place}</h2>
              <h3>{earthquake?.time}</h3>
  
            </div>
        </div>
      })}
    </div>;
  }
  
  export default App;
  