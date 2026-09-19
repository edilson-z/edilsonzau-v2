import { useEffect, useState } from "react";
import "./component-styles/ClockWidget.css";

interface ClockWidgetProps {
  /** IANA time zone, e.g. "Africa/Luanda". Defaults to the visitor's own time zone. */
  timeZone?: string;
  /** Text shown at the top. Defaults to the city part of the time zone. */
  label?: string;
  /** Use a 12-hour clock with AM/PM. Defaults to 24-hour. */
  hour12?: boolean;
}

// "Africa/Luanda" -> "Luanda", "America/New_York" -> "New York"
function cityFromZone(zone: string): string {
  return (zone.split("/").pop() ?? zone).replace(/_/g, " ");
}

export default function ClockWidget({ timeZone = "Africa/Luanda", label, hour12 = false }: ClockWidgetProps) {
  const [now, setNow] = useState(() => new Date());

  // Update on each real second boundary, so the minute flips exactly on time
  useEffect(() => {
    let id: number;
    const schedule = () => {
      id = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, 1000 - (Date.now() % 1000));
    };
    schedule();
    return () => window.clearTimeout(id);
  }, []);

  const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const title = label ?? cityFromZone(zone);

  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: hour12 ? "numeric" : "2-digit",
    minute: "2-digit",
    hourCycle: hour12 ? "h12" : "h23",
  }).formatToParts(now);
  const part = (type: string) => timeParts.find((p) => p.type === type)?.value ?? "";
  const hours = part("hour");
  const minutes = part("minute");
  const period = part("dayPeriod"); // "AM" / "PM", empty on a 24-hour clock

  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).formatToParts(now);
  const datePart = (type: string) => dateParts.find((p) => p.type === type)?.value ?? "";
  const date = `${datePart("weekday")} ${datePart("day")} ${datePart("month")}`;

  return (
    <section className="cw" aria-label={`Current time in ${title}`}>
      <h2 className="cw__label">UTC +01:00</h2>

      <p className="cw__time">
        <span aria-hidden="true">
          {hours}
          <span className="cw__colon">:</span>
          {minutes}
          {period && <span className="cw__period">{period}</span>}
        </span>
        <span className="cw__sr">
          {hours}:{minutes} {period}
        </span>
      </p>

      <p className="cw__date">{date}</p>
    </section>
  );
}