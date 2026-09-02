import React, { useState, useEffect, useRef } from 'react';
import { WISE_GIS_POINTS, MapPoint } from '../../../lib/gis-data';
import { 
  Compass, 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Building2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Search,
  Droplets,
  Flame,
  Info
} from 'lucide-react';

export default function DueDiligenceMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(WISE_GIS_POINTS[0]);
  const [showWells, setShowWells] = useState(true);
  const [showMudPid, setShowMudPid] = useState(true);
  const [showFlood, setShowFlood] = useState(true);
  const [showOffices, setShowOffices] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = await import('leaflet');
      // Import leaflet css
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current).setView([33.2348, -97.64], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);


        const markersGroup = L.layerGroup().addTo(map);
        markersGroupRef.current = markersGroup;
        mapInstanceRef.current = map;
      }

      renderMarkers(L);
    }

    initLeaflet();

    return () => {
      isMounted = false;
    };
  }, [showWells, showMudPid, showFlood, showOffices]);

  const renderMarkers = async (L: any) => {
    if (!markersGroupRef.current || !mapInstanceRef.current) return;
    markersGroupRef.current.clearLayers();

    const filtered = WISE_GIS_POINTS.filter((point) => {
      if (point.type === 'office' && !showOffices) return false;
      if (point.type === 'rrc_well' && !showWells) return false;
      if (point.type === 'mud_pid' && !showMudPid) return false;
      if (point.type === 'floodplain' && !showFlood) return false;
      return true;
    });

    filtered.forEach((point) => {
      let iconColor = '#0B2545';
      let label = '🏢';

      if (point.type === 'rrc_well') {
        iconColor = '#C59B27';
        label = '🛢️';
      } else if (point.type === 'mud_pid') {
        iconColor = '#7C3AED';
        label = '🏗️';
      } else if (point.type === 'floodplain') {
        iconColor = '#0284C7';
        label = '🌊';
      } else if (point.type === 'office') {
        iconColor = '#0B2545';
        label = '🏛️';
      }

      const customIcon = L.divIcon({
        className: 'custom-gis-marker',
        html: `
          <div style="
            background-color: ${iconColor}; 
            color: white; 
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            font-size: 14px;
            cursor: pointer;
          ">
            ${label}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([point.latitude, point.longitude], { icon: customIcon });
      marker.on('click', () => {
        setSelectedPoint(point);
      });
      markersGroupRef.current.addLayer(marker);
    });
  };

  const handleSelectPoint = (point: MapPoint) => {
    setSelectedPoint(point);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([point.latitude, point.longitude], 13, { duration: 1.5 });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Map Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Compass className="w-3.5 h-3.5" />
              North Texas Real Estate Intelligence
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Wise County Property Due Diligence GIS Map
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Inspect active/plugged Barnett Shale wellheads, MUD & PID taxing districts, FEMA floodplains, and Wise CAD parcel boundaries.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Map Viewer & Layer Controls */}
        <div className="lg:col-span-8 relative flex flex-col">
          
          {/* Layer Toggles Ribbon */}
          <div className="bg-slate-100 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700 flex items-center gap-1 uppercase tracking-wider text-[11px]">
                <Layers className="w-3.5 h-3.5 text-navy-900" /> Layers:
              </span>

              <button
                type="button"
                onClick={() => setShowOffices(!showOffices)}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border transition-colors ${
                  showOffices
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                🏛️ Title Offices
              </button>

              <button
                type="button"
                onClick={() => setShowWells(!showWells)}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border transition-colors ${
                  showWells
                    ? 'bg-gold-500 text-navy-950 border-gold-600'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                🛢️ RRC Gas Wells
              </button>

              <button
                type="button"
                onClick={() => setShowMudPid(!showMudPid)}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border transition-colors ${
                  showMudPid
                    ? 'bg-purple-700 text-white border-purple-800'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                🏗️ MUD / PID
              </button>

              <button
                type="button"
                onClick={() => setShowFlood(!showFlood)}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 border transition-colors ${
                  showFlood
                    ? 'bg-sky-600 text-white border-sky-700'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                🌊 FEMA Floodplains
              </button>
            </div>
          </div>

          {/* Leaflet Map Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[450px] lg:h-[550px] bg-slate-100 z-10"
            aria-label="Interactive Map of Wise County Real Estate Encumbrances"
          />

        </div>

        {/* Right: Selected Parcel / Point Inspector Card */}
        <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-200">
          
          <div className="space-y-4">
            
            <div className="pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-navy-900 text-lg">Due Diligence Inspector</span>
              <p className="text-xs text-slate-500">Click any map icon or select from list below</p>
            </div>

            {/* Active Point Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-navy-950 text-sm">{selectedPoint.name}</h3>
                <span className="badge-gold text-[10px] shrink-0 uppercase">
                  {selectedPoint.type.replace('_', ' ')}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {selectedPoint.details.description}
              </p>

              {selectedPoint.details.operator && (
                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <span className="text-slate-500 font-semibold">Operator / Lease:</span>
                  <span className="font-bold text-slate-900">{selectedPoint.details.operator}</span>
                </div>
              )}

              {selectedPoint.details.status && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Status:</span>
                  <span className="font-bold text-emerald-700">{selectedPoint.details.status}</span>
                </div>
              )}

              {selectedPoint.details.noticeRequired && (
                <div className="p-3 bg-purple-50 text-purple-900 rounded-xl border border-purple-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Contract Notice Mandatory:</strong> Seller must provide statutory notice to buyer before contract execution.
                  </span>
                </div>
              )}
            </div>

            {/* Quick Points List */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Key Geographic Locations:
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {WISE_GIS_POINTS.map((point) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => handleSelectPoint(point)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border transition-colors flex items-center justify-between ${
                      selectedPoint.id === point.id
                        ? 'bg-navy-900 text-white font-bold border-navy-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-2">{point.name}</span>
                    <span className="text-[10px] opacity-70 uppercase">{point.county}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom CAD Links & Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <a
              href="https://www.wisecad.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-outline text-xs flex items-center justify-center gap-2"
            >
              <span>Search Wise County CAD Records</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href="/order"
              className="w-full btn-gold text-xs flex items-center justify-center gap-2"
            >
              <span>Order Title Examination on Tract</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
