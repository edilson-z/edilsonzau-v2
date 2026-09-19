import { useEffect, useState, type ReactNode } from "react";
import "./component-styles/WeatherWidget.css";

// Vite. For Create React App use process.env.REACT_APP_WEATHER_API_KEY,
// for Next.js use process.env.NEXT_PUBLIC_WEATHER_API_KEY.
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

const API_URL = "https://api.openweathermap.org/data/2.5";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface WeatherData {
    weather: { id: number; description: string; icon: string }[];
    main: { temp: number };
    sys: { country: string };
    name: string;
}

interface ForecastData {
    list: { main: { temp_min: number; temp_max: number } }[];
}

interface Range {
    high: number;
    low: number;
}

type Units = "metric" | "imperial";

type IconName =
    | "sun"
    | "moon"
    | "cloud-sun"
    | "cloud-moon"
    | "cloud"
    | "cloud-drizzle"
    | "cloud-rain"
    | "cloud-lightning"
    | "cloud-snow"
    | "cloud-fog";

/* ------------------------------------------------------------------ */
/* Icons (line icons from Lucide, ISC licence, inlined)                */
/* ------------------------------------------------------------------ */

const CLOUD_BASE = "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242";

const ICONS: Record<IconName, ReactNode> = {
    sun: (
        <>
            <circle fill="#ffff00" cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
    ),
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
    "cloud-sun": (
        <>
            <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41" />
            <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
            <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </>
    ),
    "cloud-moon": (
        <>
            <path d="M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197" />
            <path d="M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z" />
        </>
    ),
    cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
    "cloud-drizzle": (
        <>
            <path d={CLOUD_BASE} />
            <path d="M8 19v1M8 14v1M16 19v1M16 14v1M12 21v1M12 16v1" />
        </>
    ),
    "cloud-rain": (
        <>
            <path d={CLOUD_BASE} />
            <path d="M16 14v6M8 14v6M12 16v6" />
        </>
    ),
    "cloud-lightning": (
        <>
            <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
            <path d="m13 12-3 5h4l-3 5" />
        </>
    ),
    "cloud-snow": (
        <>
            <path d={CLOUD_BASE} />
            <path d="M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01" />
        </>
    ),
    "cloud-fog": (
        <>
            <path d={CLOUD_BASE} />
            <path d="M16 17H7M17 21H9" />
        </>
    ),
};

// OpenWeatherMap condition ids: https://openweathermap.org/weather-conditions
function getIcon(id: number, night: boolean): IconName {
    if (id >= 200 && id < 300) return "cloud-lightning";
    if (id >= 300 && id < 400) return "cloud-drizzle";
    if (id >= 500 && id < 600) return "cloud-rain";
    if (id >= 600 && id < 700) return "cloud-snow";
    if (id >= 700 && id < 800) return "cloud-fog";
    if (id === 800) return night ? "moon" : "sun";
    if (id === 801 || id === 802) return night ? "cloud-moon" : "cloud-sun"; // few / scattered
    return "cloud"; // broken / overcast
}

/* ------------------------------------------------------------------ */
/* Card (pass it data, it draws it)                                    */
/* ------------------------------------------------------------------ */

export function WeatherCard({
    data,
    range,
    units = "metric",
}: {
    data: WeatherData;
    range?: Range | null;
    units?: Units;
}) {
    const condition = data.weather[0];
    const night = condition.icon.endsWith("n");
    const symbol = units === "imperial" ? "°F" : "°C";
    const description =
        condition.description.charAt(0).toUpperCase() + condition.description.slice(1);

    return (
        <section className="ww" aria-label={`Weather in ${data.name}`}>
            <h2 className="ww__city">
                {data.name}, {data.sys.country}
            </h2>

            <div className="ww__now">
                <svg
                    className="ww__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {ICONS[getIcon(condition.id, night)]}
                </svg>
                <div className="ww__text">
                    <p className="ww__temp">
                        {Math.round(data.main.temp)}
                        {symbol}
                    </p>
                    <p className="ww__desc">{description}</p>
                </div>
            </div>

            {range && (
                <p className="ww__range">
                    High {Math.round(range.high)}° – Low {Math.round(range.low)}°
                </p>
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Widget (fetches the data, then renders the card)                    */
/* ------------------------------------------------------------------ */

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
    const res = await fetch(url, { signal });
    if (res.status === 401) throw new Error("OpenWeatherMap rejected the API key.");
    if (!res.ok) throw new Error(`OpenWeatherMap returned an error (${res.status}).`);
    return res.json();
}

interface WeatherWidgetProps {
    lat?: number;
    lon?: number;
    units?: Units;
}

export default function Weather({
    lat = -8.83,
    lon = 13.24,
    units = "metric",
}: WeatherWidgetProps) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [range, setRange] = useState<Range | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0); // bump to refetch

    useEffect(() => {
        if (!API_KEY) {
            setError(
                "API key not found. Check the variable name in your .env file and restart the dev server."
            );
            return;
        }

        const controller = new AbortController();
        const { signal } = controller;
        const query = `lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
        setError(null);

        Promise.all([
            fetchJson<WeatherData>(`${API_URL}/weather?${query}`, signal),
            // Next 24 hours (8 x 3-hour steps). If this fails, we just hide the high/low line.
            fetchJson<ForecastData>(`${API_URL}/forecast?${query}&cnt=8`, signal).catch(() => null),
        ])
            .then(([current, forecast]) => {
                setData(current);
                if (forecast && forecast.list.length > 0) {
                    const temps = forecast.list.flatMap((i) => [i.main.temp_min, i.main.temp_max]);
                    setRange({
                        high: Math.max(current.main.temp, ...temps),
                        low: Math.min(current.main.temp, ...temps),
                    });
                } else {
                    setRange(null);
                }
            })
            .catch((err: Error) => {
                if (err.name === "AbortError") return;
                console.error("Error loading weather data", err);
                setError(err.message || "Check your connection and try again.");
            });

        return () => controller.abort();
    }, [lat, lon, units, attempt]);

    if (error) {
        return (
            <section className="ww" role="alert">
                <p className="ww__error-title">Weather unavailable</p>
                <p className="ww__error-text">{error}</p>
                <button className="ww__retry" onClick={() => setAttempt((n) => n + 1)}>
                    Try again
                </button>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="ww" aria-busy="true">
                <p className="ww__status">Loading weather…</p>
            </section>
        );
    }

    return <WeatherCard data={data} range={range} units={units} />;
}