import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.css";
import thermometre from "./icon/thermometer.svg";
import cloud from "./icon/cloud.svg";
import sun from "./icon/sun.svg";
import sunrises from "./icon/sunrise.svg";
import sunsets from "./icon/sunset.svg";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [latitude, setLatitude] = useState("14.6937");
  const [longitude, setLongitude] = useState("-17.4441");
  const [isReady, setReady] = useState(false);
  const [thumbnailColor, setThumbnailColor] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ca1dfa879998b83bc68ac5786741da8b&units=metric`
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setCity(jsonresult.name);
        setTemp(jsonresult.main.temp);
        setMain(jsonresult.weather[0].main);
        setDesc(jsonresult.weather[0].description);
        setIcon(jsonresult.weather[0].icon);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());

        if (jsonresult.main.temp < 20) {
          setThumbnailColor("thumbnail-turquoise");
        } else if (jsonresult.main.temp >= 20 && jsonresult.main.temp <= 25) {
          setThumbnailColor("thumbnail-lightgreen");
        } else {
          setThumbnailColor("thumbnail-red");
        }
        setReady(true);
      })
      .catch((err) => console.error(err));
  }, [latitude, longitude]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setReady(false);
    setLatitude(event.target.latitude.value);
    setLongitude(event.target.longitude.value);
  };

  if (isReady) {
    return (
      <div className="container">
        <div className="row justify-content-center"> 
          <div className="col-md-4"> 
            <div className="thumbnails">
              <div className="header">
                <h3>Rentrez les coordonnées</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="latitude"
                      name="latitude"
                      placeholder="Entrez latitude"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="longitude"
                      name="longitude"
                      placeholder="Entrez longitude"
                      required
                    />
                  </div>
                  <br/>
                  <button type="submit" className="btn btn-success">Obtenir la Météo</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"> 
            <div className={`thumbnail ${thumbnailColor}`}>
              <div className="header">
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"/>
                <h3>{city}</h3>
              </div>
              <div className="card-body text-right">
                <p className="card-text"><img src={thermometre} alt="thermometre"/> Temperature: {temp} °C</p>
                <p className="card-text"><img src={cloud} alt="cloud"/> Main: {main}</p>
                <p className="card-text"><img src={sun} alt="sun"/> Description: {desc}</p>
                <p className="card-text"><img src={sunrises} alt="sunrise"/> Sunrise: {sunrise}</p>
                <p className="card-text"><img src={sunsets} alt="sunset"/>Sunset: {sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
