import React, { useState, useEffect, useMemo, useRef } from "react";
import { Plus, Minus, Layers, Crosshair } from "lucide-react";
import { getStatusColor } from "./StatusBadge";
let cachedKecamatanGeoJson = null;

function normalizeName(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/^kecamatan\s+/i, "")
        .replace(/darus\s+sholah/i, "ds")
        .replace(/[^a-z0-9]/g, "");
}

const centerCoords = [-7.9135, 113.8214];

export default function StatusEndemisMap({
    allKecamatan = [],
    selectedKecamatanId = "",
    selectedOPTId,
    statusMatrix = {},
}) {
    const [isClient, setIsClient] = useState(false);
    const [mapComponents, setMapComponents] = useState(null);
    const [kecamatanGeoJson, setKecamatanGeoJson] = useState(
        cachedKecamatanGeoJson,
    );
    const [mapLayer, setMapLayer] = useState("satellite");
    const geoJsonRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
        Promise.all([import("react-leaflet"), import("leaflet")]).then(
            ([RL, L]) => {
                setMapComponents({
                    MapContainer: RL.MapContainer,
                    TileLayer: RL.TileLayer,
                    GeoJSON: RL.GeoJSON,
                    useMap: RL.useMap,
                });
            },
        );

        if (!cachedKecamatanGeoJson) {
            fetch("/data/batas_kecamatan.json")
                .then((res) => res.json())
                .then((data) => {
                    cachedKecamatanGeoJson = data;
                    setKecamatanGeoJson(data);
                })
                .catch((err) => {
                    console.error("Gagal memuat batas_kecamatan.json:", err);
                });
        }
    }, []);

    const selectedKecamatanObj = useMemo(() => {
        if (!selectedKecamatanId) return null;
        return allKecamatan.find(
            (k) => String(k.id) === String(selectedKecamatanId),
        );
    }, [selectedKecamatanId, allKecamatan]);

    // Filter features based on selected kecamatan
    const filteredGeoJson = useMemo(() => {
        if (!kecamatanGeoJson || !kecamatanGeoJson.features) return null;

        if (!selectedKecamatanObj) {
            return kecamatanGeoJson;
        }

        const normSelected = normalizeName(selectedKecamatanObj.nama_kecamatan);
        const features = kecamatanGeoJson.features.filter((f) => {
            const normFeat = normalizeName(f.properties?.KECAMATAN);
            return normFeat === normSelected;
        });

        return {
            type: "FeatureCollection",
            features:
                features.length > 0 ? features : kecamatanGeoJson.features,
        };
    }, [kecamatanGeoJson, selectedKecamatanObj]);

    if (!isClient || !mapComponents) {
        return (
            <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-900 font-semibold text-sm">
                Memuat Peta Satelit Batas Kecamatan GIS...
            </div>
        );
    }

    const { MapContainer, TileLayer, GeoJSON, useMap } = mapComponents;

    function MapActionHandler() {
        const map = useMap();

        useEffect(() => {
            if (geoJsonRef.current && selectedKecamatanObj) {
                try {
                    const bounds = geoJsonRef.current.getBounds();
                    if (bounds && bounds.isValid()) {
                        map.fitBounds(bounds, { padding: [30, 30] });
                    }
                } catch (e) {
                    console.warn("fitBounds error:", e);
                }
            } else if (!selectedKecamatanObj) {
                map.setView(centerCoords, 11);
            }
        }, [map]);

        return (
            <div className="absolute top-5 right-5 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => map.zoomIn()}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60 cursor-pointer"
                    title="Zoom In"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button
                    onClick={() => map.zoomOut()}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60 cursor-pointer"
                    title="Zoom Out"
                >
                    <Minus className="w-5 h-5" />
                </button>
                <button
                    onClick={() => {
                        if (mapLayer === "satellite") setMapLayer("terrain");
                        else if (mapLayer === "terrain") setMapLayer("street");
                        else setMapLayer("satellite");
                    }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60 cursor-pointer"
                    title={`Layer saat ini: ${mapLayer}. Klik untuk ganti.`}
                >
                    <Layers className="w-5 h-5" />
                </button>
                <button
                    onClick={() => map.setView(centerCoords, 11)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60 cursor-pointer"
                    title="Reset View"
                >
                    <Crosshair className="w-5 h-5" />
                </button>
            </div>
        );
    }

    const styleFeature = (feature) => {
        const kecName = feature.properties?.KECAMATAN;
        const normFeatKec = normalizeName(kecName);

        const matchingKec = allKecamatan.find(
            (k) => normalizeName(k.nama_kecamatan) === normFeatKec,
        );

        const kecId = matchingKec ? matchingKec.id : null;
        const status =
            kecId && statusMatrix[kecId]?.[selectedOPTId]
                ? statusMatrix[kecId][selectedOPTId]
                : "Aman";

        const color = getStatusColor(status);

        return {
            fillColor: color,
            weight: 2,
            opacity: 0.95,
            color: "#ffffff",
            dashArray: "3",
            fillOpacity: 0.55,
        };
    };

    const onEachFeature = (feature, layer) => {
        const rawKecName = feature.properties?.KECAMATAN || "Kecamatan";
        const cleanKecName = rawKecName.replace(/^kecamatan\s+/i, "");
        const normFeatKec = normalizeName(rawKecName);

        const matchingKec = allKecamatan.find(
            (k) => normalizeName(k.nama_kecamatan) === normFeatKec,
        );

        const kecId = matchingKec ? matchingKec.id : null;
        const status =
            kecId && statusMatrix[kecId]?.[selectedOPTId]
                ? statusMatrix[kecId][selectedOPTId]
                : "Aman";

        const popupContent = `
            <div style="font-family: sans-serif; padding: 4px;">
                <h4 style="font-weight: 700; margin: 0; font-size: 13px; color: #0f172a;">Kecamatan ${cleanKecName}</h4>
                <p style="margin: 2px 0 6px 0; font-size: 11px; color: #64748b;">Kabupaten Bondowoso</p>
                <div style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-weight: 700; font-size: 11px; color: #fff; background-color: ${getStatusColor(
                    status,
                )};">
                    Status Endemis: ${status}
                </div>
            </div>
        `;

        layer.bindTooltip(popupContent, { sticky: true, direction: "top" });

        layer.on({
            mouseover: (e) => {
                const l = e.target;
                l.setStyle({
                    weight: 3.5,
                    color: "#ffffff",
                    dashArray: "",
                    fillOpacity: 0.8,
                });
                l.bringToFront();
            },
            mouseout: (e) => {
                if (geoJsonRef.current) {
                    geoJsonRef.current.resetStyle(e.target);
                }
            },
        });
    };

    return (
        <MapContainer
            center={centerCoords}
            zoom={11}
            zoomControl={false}
            className="h-full w-full z-0"
        >
            {/* Base Layer */}
            <TileLayer
                url={
                    mapLayer === "satellite"
                        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        : mapLayer === "terrain"
                          ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                          : "https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png"
                }
                attribution={
                    mapLayer === "satellite"
                        ? "&copy; Esri &mdash; Source: USGS, Esri, NOAA"
                        : "&copy; OpenStreetMap contributors"
                }
            />

            {/* Label / Nama Wilayah Overlay khusus Satelit */}
            {mapLayer === "satellite" && (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
            )}

            {filteredGeoJson && (
                <GeoJSON
                    key={`${selectedOPTId}_${selectedKecamatanId}_${mapLayer}`}
                    ref={geoJsonRef}
                    data={filteredGeoJson}
                    style={styleFeature}
                    onEachFeature={onEachFeature}
                />
            )}

            <MapActionHandler />
        </MapContainer>
    );
}
