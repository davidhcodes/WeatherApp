import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const apiKey = process.env.REACT_APP_API_KEY;
const options = {
  title: "Weather Forecast",
  hAxis: {
    title: "Date",
    format: "dd/MM",
    gridlines: { count: 8 },
  },
  vAxis: {
    title: "Temperature °C",
  },
  curveType: "function",
  legend: { position: "bottom" },
};

function DayForecast({ city }) {
  const [fiveDWeatherData, setfiveDWeatherData] = useState([]);
  const [fiveDIsLoading, setfiveDIsLoading] = useState(false);
  const [fiveDErr, setfiveDErr] = useState(null);
  const [weatherGraphData, setWeatherGraphData] = useState([]);

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;
      setfiveDIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Not Found");
        }
        const weather = await response.json();
        setfiveDErr(null);
        setfiveDWeatherData(weather);

        const formattedGraphData = formatData(weather);
        console.log("Formatted Graph Data: ", formattedGraphData);

        setWeatherGraphData(formattedGraphData);
        setfiveDIsLoading(false);
      } catch (error) {
        setfiveDErr(error);
        setfiveDIsLoading(false);
      }
    };
    fetchData();
  }, [city, url]);

  if (fiveDIsLoading) {
    return <p>Loading!...</p>;
  }

  function kelToCel(tempInK) {
    return Number(Math.round(tempInK - 273.15));
  }

  if (fiveDErr) {
    return (
      <>
        <h2>Something went wrong</h2>
        <p>{fiveDErr.message}</p>
      </>
    );
  }

  const formatData = (weather) => {
    return weather.list.map((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString(); // Format date as a readable string
      const temp = kelToCel(entry.main.temp); // Convert temperature from Kelvin to Celsius
      return { date, temp };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <h2 className="text-white text-4xl font-semibold text-center mb-5">
        {city}
      </h2>
      <h2 className="text-white text-2xl font-semibold text-center mb-5">
        {" "}
        Five Day Forecast{" "}
      </h2>
      {weatherGraphData.length > 0 ? (
        <ResponsiveContainer width="50%" height={400} className="bg-sky-400">
          <LineChart data={weatherGraphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "white" }} // Color of X-axis text
              axisLine={{ stroke: "white" }} // Color of X-axis line
              tickLine={{ stroke: "white" }} // Color of X-axis tick lines
              ticks={weatherGraphData
                .map((d) => d.date)
                .filter((date, index, arr) => arr.indexOf(date) === index)} // Only show unique dates
            />
            <YAxis
              label={{
                value: "Temperature",
                angle: -90,
                position: "insideLeft",
                fill: "white",
              }} // Y-axis label color
              tick={{ fill: "white" }} // Color of Y-axis text
              axisLine={{ stroke: "white" }} // Color of Y-axis line
              tickLine={{ stroke: "white" }} // Color of Y-axis tick lines
            />
            {/* <Tooltip /> */}
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              name="Temperature"
              color="#8884d8"
              stroke="white"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <h1>This should be a graph</h1>
      )}
    </div>
  );
}

export default DayForecast;
