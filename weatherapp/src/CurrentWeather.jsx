import { useEffect, useState } from "react";
import { ReactComponent as ClearSun } from "./assets/videos/01d.svg";
import { ReactComponent as ClearMoon } from "./assets/videos/01n.svg";
import { ReactComponent as RainDay } from "./assets/videos/10d.svg";
import { ReactComponent as RainNight } from "./assets/videos/10n.svg";
import { ReactComponent as FewCloudsD } from "./assets/videos/02d.svg";
import { ReactComponent as FewCloudsN } from "./assets/videos/02n.svg";
import { ReactComponent as ScatteredCloudsD } from "./assets/videos/03d.svg";
import { ReactComponent as BrokenCloudsD } from "./assets/videos/04d.svg";
import { ReactComponent as ShowerRainD } from "./assets/videos/09d.svg";
import { ReactComponent as ThunderStorm } from "./assets/videos/11d.svg";
import { ReactComponent as Snow } from "./assets/videos/13d.svg";
import { ReactComponent as Mist } from "./assets/videos/50d.svg";
import { WeatherConditionConverter } from "./WeatherCondConverter";

const apiKey = process.env.REACT_APP_API_KEY;

function CurrentWeather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [dayOrNight, setDayOrNight] = useState(null);

  let newDate = "";
  useEffect(() => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      console.log("Fetching data from URL:", url);

      setIsLoading(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((weather) => {
          setErr(null);
          setWeatherData(weather);
          console.log("The weather is ", weather);
          console.log("The iconname is ", weather.weather[0].icon.slice(2));
          {
            weather.weather[0].icon.slice(2) === "n"
              ? setDayOrNight("Night")
              : setDayOrNight("Day");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setErr(error);
          setIsLoading(false);
        });
    }
  }, [city]);

  // useEffect(() => {
  //   console.log("The value of dayOrNight is ", dayOrNight);
  // }, [dayOrNight]);

  if (isLoading) {
    return <p>Loading!...</p>;
  }

  if (err) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{err.message}</p>
      </div>
    );
  }

  function kelToCel(tempInK) {
    return Math.round(tempInK - 273.15);
  }

  let description = "";
  let UpperCaseDescription = "";
  let WeatherIconComponent = null;

  if (weatherData) {
    description = weatherData.weather[0].description;
    const splitDescription = description.split(" ");
    for (let i = 0; i < splitDescription.length; i++) {
      splitDescription[i] =
        splitDescription[i][0].toUpperCase() + splitDescription[i].substr(1);
    }
    UpperCaseDescription = splitDescription.join(" ");

    const WeatherIcon = WeatherConditionConverter(weatherData.weather[0].icon);
    WeatherIconComponent = WeatherIcon ? <WeatherIcon /> : null;

    newDate = new Date(weatherData.dt * 1000); // Convert UNIX timestamp to JavaScript Date object

    console.log(
      "The date is ",
      newDate,
      "the weatherDataDt is",
      weatherData.dt
    );
  }
  // Is the icon tag is n show the night sky, if it is a d, show the sunny day
  return (
    // {dayOrNight === "Day" ? :}
    <>
      {dayOrNight === "Day" ? (
        <div className="min-h-screen bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col items-center justify-center p-4">
          <div className="bg-gradient-to-t from-sky-400 to-blue-600  rounded-lg shadow-lg p-6 w-1/2 max-h-fit">
            <h2 className="text-white text-4xl font-semibold text-center">
              {city}
            </h2>

            {weatherData && (
              <>
                <p className="text-center pt-1 text-9xl text-white pb-5 pl-8">
                  {kelToCel(weatherData.main?.temp)}°
                </p>
                {WeatherIconComponent && (
                  <div className="flex justify-center mb-4">
                    {WeatherIconComponent}
                  </div>
                )}
                <div className="space-x-5 pt-2 space-y-2">
                  <p className="text-center text-3xl text-white space-x-5">
                    {UpperCaseDescription}
                  </p>
                  <p className="text-center text-2xl text-white space-x-5">
                    H:{kelToCel(weatherData.main?.temp_max)}° L:
                    {kelToCel(weatherData.main?.temp_min)}°
                  </p>
                  <p className="text-center text-xl text-white space-x-5">
                    Humidity: {weatherData.main?.humidity}%
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex flex-col items-center justify-center p-4">
          <div className="bg-gradient-to-t from-purple-800 to-black  rounded-lg shadow-lg p-6 h-1/2 w-1/4 max-h-fit">
            <h2 className="text-white text-6xl font-semibold text-center">
              {city}
            </h2>

            {weatherData && (
              <>
                <p className="text-center pt-1 text-9xl text-white pb-5 pl-8">
                  {kelToCel(weatherData.main?.temp)}°
                </p>
                {WeatherIconComponent && (
                  <div className="flex justify-center  ">
                    {WeatherIconComponent}
                  </div>
                )}
                <div className="space-x-5 text-center space-y-2">
                  <p className="text-center text-3xl text-white space-x-5">
                    {UpperCaseDescription}
                  </p>
                  <p className="text-center text-2xl text-white space-x-5">
                    H:{kelToCel(weatherData.main?.temp_max)}° L:
                    {kelToCel(weatherData.main?.temp_min)}°
                  </p>
                  <p className="text-center text-xl text-white space-x-5">
                    Humidity: {weatherData.main?.humidity}%
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentWeather;
