import { useState } from "react";
import "./App.css";
import "./index.css";
import Homepage from "./Homepage";
import CurrentWeather from "./CurrentWeather";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DayForecast from "./DayForecast";

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Homepage city={city} setCity={setCity} />}
          />
          <Route
            path="/five-day-forecast"
            element={<DayForecast city={city} />}
          />
          <Route
            path="/current-day-forecast"
            element={<CurrentWeather city={city} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
