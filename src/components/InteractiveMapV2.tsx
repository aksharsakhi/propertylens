'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LivePoiItem, LocationCoordinates } from '../types';
import { Layers, Globe, Mountain, ShieldAlert, Train, Hospital, School, Trees, Droplets } from 'lucide-react';

interface InteractiveMapV2Props {
  coordinates: LocationCoordinates;
  addressName: string;
  pois?: LivePoiItem[];
  height?: string;
}

const TILE_STYLES = {
  dark: {
    name: 'Dark Vector',
    url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  terrain: {
    name: 'Terrain',
    url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
  }
};

export const InteractiveMapV2: React.FC<InteractiveMapV2Props> = ({
  coordinates,
  addressName,
  pois = [],
  height = '480px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [currentStyle, setCurrentStyle] = useState<'dark' | 'satellite' | 'terrain'>('dark');
  const [activePoiFilter, setActivePoiFilter] = useState<'all' | 'hospital' | 'metro' | 'school' | 'park'>('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const tileConf = TILE_STYLES[currentStyle];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'base-tile': {
            type: 'raster',
            tiles: [tileConf.url],
            tileSize: 256,
            attribution: tileConf.attribution
          }
        },
        layers: [
          {
            id: 'base-tile-layer',
            type: 'raster',
            source: 'base-tile',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [coordinates.lng, coordinates.lat],
      zoom: 14,
      pitch: 35
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add main property pin
    const mainMarkerEl = document.createElement('div');
    mainMarkerEl.className = 'w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 via-brand-400 to-teal-300 border-4 border-slate-950 flex items-center justify-center shadow-glow animate-bounce';
    mainMarkerEl.innerHTML = `<svg class="w-5 h-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

    new maplibregl.Marker(mainMarkerEl)
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(
        new maplibregl.Popup({ offset: 25 }).setHTML(
          `<div class="p-1">
            <h4 class="font-bold text-white text-xs">${addressName}</h4>
            <p class="text-[11px] text-teal-300 font-semibold mt-0.5">PropertyLens Target Location</p>
          </div>`
        )
      )
      .addTo(map);

    // Add POI markers from live Overpass API
    const filteredPois = activePoiFilter === 'all' ? pois : pois.filter(p => p.category === activePoiFilter);

    filteredPois.forEach(poi => {
      const poiEl = document.createElement('div');
      let bgColor = 'bg-teal-500';
      if (poi.category === 'hospital') bgColor = 'bg-rose-500';
      if (poi.category === 'school') bgColor = 'bg-amber-500';
      if (poi.category === 'metro') bgColor = 'bg-indigo-500';
      if (poi.category === 'park') bgColor = 'bg-emerald-500';

      poiEl.className = `w-7 h-7 rounded-full ${bgColor} border-2 border-slate-950 flex items-center justify-center shadow-md cursor-pointer hover:scale-125 transition-transform`;
      poiEl.innerHTML = `<span class="text-[9px] font-bold text-white uppercase">${poi.category[0]}</span>`;

      new maplibregl.Marker(poiEl)
        .setLngLat([poi.lng, poi.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 20 }).setHTML(
            `<div class="p-1">
              <h5 class="font-bold text-white text-xs">${poi.name}</h5>
              <p class="text-[11px] text-slate-300">${poi.category.toUpperCase()} • ${poi.distanceKm} km away</p>
            </div>`
          )
        )
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [coordinates, addressName, pois, currentStyle, activePoiFilter]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-slate-700/80 shadow-glass">
      
      {/* Map Control Bar Top */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Tile Style Selector */}
        <div className="glass-card p-1 rounded-xl flex items-center space-x-1 pointer-events-auto text-xs">
          <button
            onClick={() => setCurrentStyle('dark')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              currentStyle === 'dark' ? 'bg-brand-500 text-slate-950 shadow-glow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setCurrentStyle('satellite')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              currentStyle === 'satellite' ? 'bg-brand-500 text-slate-950 shadow-glow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setCurrentStyle('terrain')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              currentStyle === 'terrain' ? 'bg-brand-500 text-slate-950 shadow-glow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Terrain
          </button>
        </div>

        {/* POI Filter Bar */}
        <div className="glass-card p-1 rounded-xl flex items-center space-x-1 pointer-events-auto text-xs">
          <button
            onClick={() => setActivePoiFilter('all')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              activePoiFilter === 'all' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400'
            }`}
          >
            All POIs
          </button>
          <button
            onClick={() => setActivePoiFilter('hospital')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              activePoiFilter === 'hospital' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400'
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => setActivePoiFilter('metro')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              activePoiFilter === 'metro' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400'
            }`}
          >
            Metro
          </button>
          <button
            onClick={() => setActivePoiFilter('school')}
            className={`px-2 py-1 rounded-lg font-medium transition-all ${
              activePoiFilter === 'school' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
            }`}
          >
            Schools
          </button>
        </div>

      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} style={{ height }} className="w-full bg-slate-950" />

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span className="flex items-center space-x-1.5">
          <Globe className="w-3.5 h-3.5 text-brand-400" />
          <span>Live Coordinates: <strong>{coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}</strong></span>
        </span>
        <span className="text-[11px] text-slate-400">
          Showing {pois.length} verified live OpenStreetMap POIs
        </span>
      </div>

    </div>
  );
};
