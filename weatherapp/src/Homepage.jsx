import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage({ city, setCity }) {
  const [currentCityInput, setCurrentCityInput] = useState("");
  const [fiveDcityInput, setfiveDCityInput] = useState("");
  const [showCurrentWeatherInput, setShowCurrentWeatherInput] = useState(true);
  const [showfiveDWeatherInput, setfiveDWeatherInput] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  function handleCurrentWeatherChange(event) {
    setCurrentCityInput(event.target.value);
  }

  function handlefiveDayForecast(event) {
    setfiveDCityInput(event.target.value);
  }

  function handleTabCurrentWeather() {
    setShowCurrentWeatherInput(true);
    setfiveDWeatherInput(false);
    setCurrentCityInput("");
    setfiveDCityInput("");
  }

  function handleTabfiveDWeather() {
    setShowCurrentWeatherInput(false);
    setfiveDWeatherInput(true);
    setCurrentCityInput("");
    setfiveDCityInput("");
  }

  function handleCurrentDayForecastSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (currentCityInput === "") {
      alert("You must enter a city!");
    } else {
      setCity(currentCityInput);
      navigate("/current-day-forecast"); // Navigate programmatically
    }
  }

  function handlefiveDayForecastSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (fiveDcityInput === "") {
      alert("You must enter a city!");
    } else {
      setCity(fiveDcityInput);
      navigate("/five-day-forecast"); // Navigate programmatically
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 shadow-sm">
          Enter your city
        </h1>
      </header>
      <div className="bg-customLightBlue rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <button
            className="text-white px-4 py-2 font-bold"
            onClick={handleTabCurrentWeather}
          >
            Current forecast
          </button>
          <button
            className="text-white px-4 py-2 font-bold"
            onClick={handleTabfiveDWeather}
          >
            5 day forecast
          </button>
        </div>
        <form
          onSubmit={
            showCurrentWeatherInput
              ? handleCurrentDayForecastSubmit
              : handlefiveDayForecastSubmit
          }
        >
          {showCurrentWeatherInput && !showfiveDWeatherInput ? (
            <div className="flex">
              <label>
                <input
                  required
                  type="text"
                  onChange={handleCurrentWeatherChange}
                  value={currentCityInput}
                  className="text-black h-8 pl-1"
                />
              </label>
              <div className="text-white text-right ml-10 p-1 px-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Current forecast
                </button>
              </div>
            </div>
          ) : (
            <div className="flex">
              <label>
                <input
                  required
                  type="text"
                  onChange={handlefiveDayForecast}
                  value={fiveDcityInput}
                  className="text-black h-8 pl-1"
                />
              </label>
              <div className="text-white text-right ml-10 p-1 px-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  5 day forecast
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Homepage;
