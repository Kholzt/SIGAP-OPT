import { Head } from "@inertiajs/react";
import { Bug, Crosshair, Download, Layers, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";

export default function StatusEndemis({
    allKecamatan = [],
    allOPT = [],
    musimList = [],
    statusMatrix = {},
}) {
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedOPTId, setSelectedOPTId] = useState(
        allOPT.length > 0 ? allOPT[0].id : "",
    );
    const [selectedMusim, setSelectedMusim] = useState(
        musimList.length > 0 ? musimList[0] : "2024/2025",
    );
    const [mapZoom, setMapZoom] = useState(11);
    const [mapLayer, setMapLayer] = useState("satellite"); // 'satellite' | 'street'
    const [LeafletMap, setLeafletMap] = useState(null);

    // Dynamic import for Leaflet to prevent SSR window error
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("react-leaflet").then((L) => {
                setLeafletMap(L);
            });
            // Import leaflet CSS dynamically
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }
    }, []);

    const selectedOPT =
        allOPT.find((o) => String(o.id) === String(selectedOPTId)) || allOPT[0];

    // Status styling maps
    const getStatusBadge = (status) => {
        switch (status) {
            case "Aman":
                return (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#10B981] text-white shadow-2xs">
                        Aman
                    </span>
                );
            case "Potensial":
                return (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-white shadow-2xs">
                        Potensial
                    </span>
                );
            case "Sporadis":
                return (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#F87171] text-white shadow-2xs">
                        Sporadis
                    </span>
                );
            case "Endemis":
                return (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#EF4444] text-white shadow-2xs">
                        Endemis
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                        {status || "Aman"}
                    </span>
                );
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Aman":
                return "#10B981";
            case "Potensial":
                return "#F59E0B";
            case "Sporadis":
                return "#F87171";
            case "Endemis":
                return "#EF4444";
            default:
                return "#10B981";
        }
    };

    // Filter kecamatans for table
    const filteredKecamatans = selectedKecamatan
        ? allKecamatan.filter((k) => String(k.id) === String(selectedKecamatan))
        : allKecamatan;

    // Default Bondowoso kecamatan coordinates fallback generator
    const defaultCoords = [
        { name: "Maesan", lat: -8.0051, lng: 113.7844 },
        { name: "Tamanan", lat: -8.0122, lng: 113.825 },
        { name: "Grujugan", lat: -7.973, lng: 113.795 },
        { name: "Bondowoso", lat: -7.9135, lng: 113.8214 },
        { name: "Curahdami", lat: -7.91, lng: 113.78 },
        { name: "Tenggarang", lat: -7.9, lng: 113.84 },
        { name: "Wonosari", lat: -7.91, lng: 113.88 },
        { name: "Tapen", lat: -7.87, lng: 113.92 },
        { name: "Prujekan", lat: -7.76, lng: 113.96 },
        { name: "Wringin", lat: -7.81, lng: 113.74 },
        { name: "Tlogosari", lat: -7.985, lng: 113.94 },
        { name: "Pujer", lat: -7.975, lng: 113.885 },
        { name: "Sukosari", lat: -7.96, lng: 113.98 },
        { name: "Klabang", lat: -7.82, lng: 113.92 },
        { name: "Cermee", lat: -7.76, lng: 114.02 },
        { name: "Botolinggo", lat: -7.8, lng: 114.0 },
    ];

    // Export Table to CSV
    const handleExport = () => {
        const headers = ["Nama Kecamatan", ...allOPT.map((o) => o.nama_opt)];
        const rows = filteredKecamatans.map((kec) => {
            const rowData = [kec.nama_kecamatan];
            allOPT.forEach((o) => {
                const st = statusMatrix[kec.id]?.[o.id] || "Aman";
                rowData.push(st);
            });
            return rowData;
        });

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            `Status_Endemis_Bondowoso_${selectedMusim.replace("/", "_")}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AdminLayout currentTab="Status Endemis">
            <Head title="Status Endemis" />

            <div className="space-y-8">
                {/* GIS Interactive Satellite Map Container */}
                <div className="relative h-[540px] md:h-[580px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-900 z-10">
                    {/* Leaflet Map / GIS Interactive Map */}
                    {LeafletMap ? (
                        <LeafletMap.MapContainer
                            center={[-7.9135, 113.8214]}
                            zoom={mapZoom}
                            zoomControl={false}
                            className="h-full w-full z-0"
                        >
                            <LeafletMap.TileLayer
                                url={
                                    mapLayer === "satellite"
                                        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        : "https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png"
                                }
                                attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                            />

                            {/* Render Circle Markers per Kecamatan */}
                            {allKecamatan.map((kec, idx) => {
                                const coord =
                                    defaultCoords[idx % defaultCoords.length];
                                const currentStatus =
                                    statusMatrix[kec.id]?.[selectedOPTId] ||
                                    "Aman";
                                const color = getStatusColor(currentStatus);

                                return (
                                    <LeafletMap.CircleMarker
                                        key={kec.id}
                                        center={[
                                            kec.latitude || coord.lat,
                                            kec.longitude || coord.lng,
                                        ]}
                                        radius={14}
                                        pathOptions={{
                                            color: color,
                                            fillColor: color,
                                            fillOpacity: 0.7,
                                            weight: 2,
                                        }}
                                    >
                                        <LeafletMap.Tooltip
                                            permanent={false}
                                            direction="top"
                                        >
                                            <div className="text-xs font-semibold">
                                                <p className="font-bold">
                                                    {kec.nama_kecamatan}
                                                </p>
                                                <p className="text-[11px]">
                                                    Status: {currentStatus}
                                                </p>
                                            </div>
                                        </LeafletMap.Tooltip>
                                    </LeafletMap.CircleMarker>
                                );
                            })}
                        </LeafletMap.MapContainer>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-900">
                            Loading GIS Satellite Map...
                        </div>
                    )}

                    {/* Floating Top Left Filter Wilayah Card */}
                    <div className="absolute top-5 left-5 z-[1000] w-72 sm:w-80 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 space-y-3.5">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">
                                Filter Wilayah
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                KABUPATEN BONDOWOSO
                            </p>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <select
                                    value={selectedKecamatan}
                                    onChange={(e) =>
                                        setSelectedKecamatan(e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
                                >
                                    <option value="">
                                        Semua Desa / Kecamatan
                                    </option>
                                    {allKecamatan.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama_kecamatan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    value={selectedOPTId}
                                    onChange={(e) =>
                                        setSelectedOPTId(e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
                                >
                                    {allOPT.map((o) => (
                                        <option key={o.id} value={o.id}>
                                            {o.nama_opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    value={selectedMusim}
                                    onChange={(e) =>
                                        setSelectedMusim(e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
                                >
                                    {musimList.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Floating Bottom Left Legenda Status Card */}
                    <div className="absolute bottom-5 left-5 z-[1000] w-72 sm:w-80 bg-white/90 backdrop-blur-md p-4.5 rounded-2xl shadow-xl border border-white/50 text-xs">
                        <h4 className="text-sm font-bold text-slate-900 mb-2.5">
                            Legenda Status
                        </h4>

                        <div className="space-y-2 font-semibold text-slate-700">
                            <div className="flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-2xs"></span>
                                <span>0 = Aman</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-2xs"></span>
                                <span>1 = Potensial</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-[#F87171] shadow-2xs"></span>
                                <span>2 = Sporadis</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-2xs"></span>
                                <span>3 = Endemis</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/80 my-3 pt-2.5">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                OBJEK PENGAMATAN
                            </p>
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <Bug className="w-4 h-4 text-emerald-600" />
                                <span>
                                    {selectedOPT
                                        ? selectedOPT.nama_opt
                                        : "Wereng Batang Coklat"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Right Map Control Buttons */}
                    <div className="absolute top-5 right-5 z-[1000] flex flex-col gap-2">
                        <button
                            onClick={() =>
                                setMapZoom((z) => Math.min(z + 1, 18))
                            }
                            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60"
                            title="Zoom In"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() =>
                                setMapZoom((z) => Math.max(z - 1, 6))
                            }
                            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60"
                            title="Zoom Out"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() =>
                                setMapLayer(
                                    mapLayer === "satellite"
                                        ? "street"
                                        : "satellite",
                                )
                            }
                            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60"
                            title="Toggle Map Layer"
                        >
                            <Layers className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setMapZoom(11)}
                            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg border border-slate-200/60"
                            title="Reset View"
                        >
                            <Crosshair className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Bottom Section - Klasifikasi Status Desa Table */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Klasifikasi Status Desa
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Data periode {selectedMusim}
                            </p>
                        </div>

                        <button
                            onClick={handleExport}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer self-start sm:self-auto"
                        >
                            <Download className="w-4 h-4 text-slate-500" />
                            <span>Ekspor Data</span>
                        </button>
                    </div>

                    {/* Styled Status Table */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#EBF1FB] border-b border-slate-200">
                                        <th className="py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            Nama Desa
                                        </th>
                                        {allOPT.map((o) => (
                                            <th
                                                key={o.id}
                                                className="py-4 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider text-center"
                                            >
                                                {o.nama_opt}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredKecamatans.length > 0 ? (
                                        filteredKecamatans.map((kec) => (
                                            <tr
                                                key={kec.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="py-4 px-6 text-sm font-bold text-slate-900 whitespace-nowrap">
                                                    {kec.nama_kecamatan}
                                                </td>
                                                {allOPT.map((o) => {
                                                    const status =
                                                        statusMatrix[kec.id]?.[
                                                            o.id
                                                        ] || "Aman";
                                                    return (
                                                        <td
                                                            key={o.id}
                                                            className="py-4 px-4 text-center whitespace-nowrap"
                                                        >
                                                            {getStatusBadge(
                                                                status,
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={allOPT.length + 1}
                                                className="py-8 text-center text-slate-400 text-sm"
                                            >
                                                Tidak ada data kecamatan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
