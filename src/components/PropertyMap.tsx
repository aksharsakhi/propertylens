'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LocationCoordinates } from '../types';
import { Layers, ShieldAlert, Train, Hospital, School, Waves } from 'lucide-react';

interface PropertyMapProps {
  coordinates: LocationCoordinates;
  addressName: string;
  floodLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  height?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  coordinates,
  addressName,
  floodLevel = 'MEDIUM',
  height = '420px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [activeLayers, setActiveLayers] = useState({
    flood: true,
    metro: true,
    amenities: true
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous map instance if re-rendering
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Initialize MapLibre instance with zero-cost CartoDB Dark Matter tile layer
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'carto-dark': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          }
        },
        layers: [
          {
            id: 'carto-dark-layer',
            type: 'raster',
            source: 'carto-dark',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [coordinates.lng, coordinates.lat],
      zoom: 13.5,
      pitch: 35
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add main Property Target Pin Marker
    const markerEl = document.createElement('div');
    markerEl.className = 'w-9 h-9 rounded-full bg-brand-500 border-4 border-slate-950 flex items-center justify-center shadow-glow animate-bounce';
    markerEl.innerHTML = `<svg class="w-4 h-4 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

    new maplibregl.Marker(markerEl)
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(
        new maplibregl.Popup({ offset: 25 }).setHTML(
          `<div className="p-1">
            <h4 className="font-bold text-white text-xs">${addressName}</h4>
            <p className="text-[11px] text-brand-300 font-semibold mt-0.5">PropertyLens Target Location</p>
          </div>`
        )
      )
      .addTo(map);

    // Render spatial layer circles for Chennai Metro stations & hospital nodes
    map.on('load', () => {
      // Add CMRL Metro Line buffer visualization
      map.addSource('cmrl-metro', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'CMRL Corridor 3 (Madhavaram to SIPCOT)', status: 'Under Construction' },
              geometry: {
                type: 'LineString',
                coordinates: [
                  [80.2180, 12.9782], // Velachery
                  [80.2432, 12.9863], // Taramani
                  [80.2461, 12.9654], // Perungudi
                  [80.2394, 12.9431], // Thoraipakkam
                  [80.2279, 12.9010]  // Sholinganallur
                ]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: 'metro-lines',
        type: 'line',
        source: 'cmrl-metro',
        paint: {
          'line-color': '#2dd4bf',
          'line-width': 4,
          'line-dasharray': [2, 2]
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [coordinates, addressName]);

  const toggleLayer = (key: 'flood' | 'metro' | 'amenities') => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-slate-700/80 shadow-glass">
      
      {/* Layer Toggle Floating Panel */}
      <div className="absolute top-3 left-3 z-10 glass-card px-3 py-2 rounded-xl flex items-center space-x-2 text-xs">
        <Layers className="w-3.5 h-3.5 text-brand-400" />
        <span className="font-semibold text-slate-300 hidden sm:inline">Layers:</span>

        <button
          onClick={() => toggleLayer('flood')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${
            activeLayers.flood
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Flood Basin
        </button>

        <button
          onClick={() => toggleLayer('metro')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${
            activeLayers.metro
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Metro Lines
        </button>

        <button
          onClick={() => toggleLayer('amenities')}
          className={`px-2 py-1 rounded-md font-medium transition-all ${
            activeLayers.amenities
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Amenities
        </button>
      </div>

      {/* Map Container Element */}
      <div ref={mapContainerRef} style={{ height }} className="w-full bg-slate-950" />

      {/* Flood Status Badge Footer */}
      <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Waves className="w-4 h-4 text-cyan-400" />
          <span>Spatial Elevation & Hydrological Grid: <strong>{coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}</strong></span>
        </div>
        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
          floodLevel === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
          floodLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        }`}>
          {floodLevel} Flood Tier Zone
        </span>
      </div>
    </div>
  );
};
