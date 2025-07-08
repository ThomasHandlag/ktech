import { FaSearch } from "react-icons/fa";
import TextField from "../widgets/common/text_field";
import { useEffect, useState } from "react";
import SnackBar from "../widgets/common/snack_bar";

type WeatherCurrent = {
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
  temp_c: number;
};

type ForcastDay = {
  date: string;
  hour: ForcastHour[];
};

type ForcastHour = {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
};

const key = "c9a0ca46550648b29ce125849232709";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + key;
const Day6Homework = () => {
  const [location, setLocation] = useState<string>("Hanoi");
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    current: WeatherCurrent;
    forecast: { forecastday: ForcastDay[] };
  } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!location) return;

        const res = await fetch(
          `${baseUrl}&q=${location}&days=1&aqi=no&alerts=no&lang=vi`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const temp: {
          current: WeatherCurrent;
          forecast: { forecastday: ForcastDay[] };
        } = await res.json();
        const currentHour = new Date().getHours();

        const data = {
          current: temp.current,
          forecast: {
            forecastday: temp.forecast.forecastday.map((day) => ({
              ...day,
              hour: day.hour.filter(
                (hour) => new Date(hour.time).getHours() >= currentHour
              ),
            })),
          },
        };

        setWeather(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      }
    };
    const timeOutId = setTimeout(() => {
      fetchWeather();
    }, 4000);
    return () => {
      clearTimeout(timeOutId);
    };
  });

  return (
    <div className="flex items-center justify-center bg-black overflow-y-scroll p-10">
      <div className="flex flex-col w-[350px] h-[800px] bg-dblue-300 p-4 rounded-3xl gap-2">
        <TextField
          placeholder="Location"
          onChange={(e): undefined => {
            setLocation(e.target.value);
          }}
          className="mb-4 bg-slate-200 rounded-3xl"
          leading={
            <span className="text-gray-500">
              <FaSearch />
            </span>
          }
        />
        <div>
          <div className="flex flex-row justify-between items-center text-[80px] text-white">
            {Math.floor(weather?.current.temp_c ?? 0)}°
            <img src={weather?.current.condition.icon ?? undefined} className="h-[80px]" />
          </div>
          <span className="capitalize text-white font-semibold text-[35px]">
            {weather?.current.condition.text ?? "Loading..."}
          </span>
        </div>
        <div className="bg-ugray-300 rounded-3xl p-4 flex flex-row justify-between h-[160px]">
          <div className="flex flex-col items-center justify-center">
            <span className="capitalize text-[25px] text-gray-500">
              humidity
            </span>
            <span className="text-[35px]">{weather?.current.humidity}%</span>
          </div>
          <span className="bg-dblue-300/50 w-[1px] h-full"></span>
          <div className="flex flex-col items-center justify-center">
            <span className="capitalize text-[25px] text-gray-500">wind</span>
            <span className="text-[35px]">{weather?.current.wind_kph}km/h</span>
          </div>
        </div>
        <div className="bg-ugray-300 rounded-3xl p-4 flex flex-col">
          <span className="text-gray-600 text-3xl">Now</span>
          <div className="flex flex-row overflow-x-auto overflow-y-hidden gap-4 scrollbar">
            {weather?.forecast.forecastday[0].hour.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-[120px] h-[150px]"
              >
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <span className="text-[30px]">{Math.floor(hour.temp_c)}°</span>
                <span className="text-gray-500 text-[25px]">
                  {new Date(hour.time).getHours() === new Date().getHours()
                    ? "Now"
                    : `${new Date(hour.time).getHours()}:00`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <SnackBar message={error} />}
    </div>
  );
};

export default Day6Homework;
