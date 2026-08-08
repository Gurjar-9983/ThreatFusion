
"use client";

import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import { useThreatMap } from "@/lib/hooks/useThreatMap";

export default function ThreatMap() {
  const { data = [] } = useThreatMap();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function setupLeaflet() {
      const L = await import("leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setMounted(true);
    }

    setupLeaflet();
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
        Loading Threat Map...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-white">
          Global Threat Map
        </h2>

        <p className="text-sm text-slate-400">
          IOC locations from threat intelligence providers
        </p>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((location) => (
          <Marker
            key={location.country}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold">
                  {location.country}
                </h3>

                <p>IOC Count: {location.count}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}