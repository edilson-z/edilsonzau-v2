import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // must be imported, or the map renders broken
import "./component-styles/MapWidget.css";

// OpenStreetMap's free tiles. Fine for a small site; see their tile usage policy
// if you expect heavy traffic, or swap in another provider here (and its attribution).
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

interface MapWidgetProps {
    lat?: number;
    lon?: number;
    zoom?: number; // 1 = whole world, 11 = a city, 16 = streets
    label?: string;
}

export default function MapWidget({
    lat = -8.83,
    lon = 13.24,
    zoom = 12,
    label = "Luanda",
}: MapWidgetProps) {
    const mapEl = useRef<HTMLDivElement>(null);
    const map = useRef<L.Map | null>(null);
    const marker = useRef<L.CircleMarker | null>(null);

    // Create the map once
    useEffect(() => {
        const el = mapEl.current;
        if (!el) return;

        const m = L.map(el, {
            center: [lat, lon],
            zoom,
            scrollWheelZoom: false, // so scrolling the page doesn't get stuck on the map
        });

        L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(m);
        m.attributionControl.setPrefix(false); // hides the "Leaflet" flag, keeps the OSM credit

        marker.current = L.circleMarker([lat, lon], {
            radius: 7,
            color: "#f7f5f0", // light ring around the dot
            weight: 3,
            fillColor: "#222",
            fillOpacity: 1,
        }).addTo(m);

        // Scroll-to-zoom only after the map has been clicked (or tabbed to)
        const enableWheel = () => m.scrollWheelZoom.enable();
        const disableWheel = () => m.scrollWheelZoom.disable();
        el.addEventListener("focus", enableWheel);
        el.addEventListener("blur", disableWheel);

        map.current = m;

        return () => {
            el.removeEventListener("focus", enableWheel);
            el.removeEventListener("blur", disableWheel);
            m.remove();
            map.current = null;
            marker.current = null;
        };
        // Created once on purpose. Changes to lat/lon/zoom are handled by the effect below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Move the map and pin when the props change
    useEffect(() => {
        map.current?.setView([lat, lon], zoom);
        marker.current?.setLatLng([lat, lon]);
    }, [lat, lon, zoom]);

    return (
        <section  className="cm" aria-label={`Map of ${label}`}>
            <div ref={mapEl} className="cm__map" />
        </section>
    );
}