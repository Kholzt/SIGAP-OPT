import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

import {
    Sliders,
    Zap,
    Plus,
    Minus,
    Layers,
    Info,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function ModelPrediksi() {
    const [periode, setPeriode] = useState("2025/2026");
    const [desa, setDesa] = useState("Desa A");
    const [jenisOPT, setJenisOPT] = useState("Tikus Sawah");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const predictionResults = [
        { id: 1, desa: "Bataan", jenisOPT: "Tikus Sawah", luas: "12.5" },
        { id: 2, desa: "Kademangan", jenisOPT: "Tikus Sawah", luas: "8.7" },
        { id: 3, desa: "Dawuhan", jenisOPT: "Tikus Sawah", luas: "6.3" },
        { id: 4, desa: "Jurang sapi", jenisOPT: "Tikus Sawah", luas: "4.1" },
    ];

    return (
        <AdminLayout currentTab="Model Prediksi">
            <Head title="Model Prediksi" />

            <div className="space-y-6">
                {/* Top Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left Parameter Form Card */}
                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Sliders className="w-5 h-5 text-emerald-800" />
                                <h2 className="text-lg font-bold text-slate-900">
                                    Parameter Analisis
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                        Periode
                                    </label>
                                    <select
                                        value={periode}
                                        onChange={(e) =>
                                            setPeriode(e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="2025/2026">
                                            2025/2026
                                        </option>
                                        <option value="2024/2025">
                                            2024/2025
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                        Kecamatan
                                    </label>
                                    <select
                                        value={desa}
                                        onChange={(e) =>
                                            setDesa(e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Desa A">Desa A</option>
                                        <option value="Bataan">Bataan</option>
                                        <option value="Kademangan">
                                            Kademangan
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                        Jenis OPT
                                    </label>
                                    <select
                                        value={jenisOPT}
                                        onChange={(e) =>
                                            setJenisOPT(e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Tikus Sawah">
                                            Tikus Sawah
                                        </option>
                                        <option value="Wereng Batang Coklat">
                                            Wereng Batang Coklat
                                        </option>
                                        <option value="Blast">Blast</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-md text-sm">
                            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                            Jalankan Prediksi
                        </button>
                    </div>

                    {/* Right Spatial Map Card */}
                    <div className="lg:col-span-8 bg-[#0C2329] rounded-2xl relative overflow-hidden border border-slate-800 shadow-md min-h-[380px] flex flex-col">
                        {/* Map Header / Live Badge */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs">
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">
                                LIVE: Analisis Spasial
                            </span>
                        </div>

                        {/* Controls Top Right */}
                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                            <button className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-sm">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-sm">
                                <Minus className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-sm">
                                <Layers className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Interactive GIS Visual / Simulation Canvas */}
                        <div className="w-full h-full min-h-[360px] relative bg-slate-900 flex items-center justify-center overflow-hidden">
                            {/* Stylized Spatial GIS Overlay */}
                            <svg
                                className="w-full h-full absolute inset-0 opacity-85"
                                viewBox="0 0 800 500"
                                preserveAspectRatio="xMidYMid slice"
                            >
                                <defs>
                                    <linearGradient
                                        id="grad1"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#10B981"
                                            stopOpacity="0.8"
                                        />
                                        <stop
                                            offset="50%"
                                            stopColor="#F59E0B"
                                            stopOpacity="0.8"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#EF4444"
                                            stopOpacity="0.8"
                                        />
                                    </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                <pattern
                                    id="grid"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path
                                        d="M 40 0 L 0 0 0 40"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="1"
                                    />
                                </pattern>
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="url(#grid)"
                                />

                                {/* Spatial heat polygons */}
                                <polygon
                                    points="350,80 480,120 520,240 460,380 340,420 280,310 300,180"
                                    fill="url(#grad1)"
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                    opacity="0.85"
                                />
                                <polygon
                                    points="480,120 620,150 680,260 610,340 520,240"
                                    fill="#10B981"
                                    opacity="0.6"
                                    stroke="#ffffff"
                                    strokeWidth="1"
                                />
                                <polygon
                                    points="220,200 300,180 280,310 180,330 140,250"
                                    fill="#3B82F6"
                                    opacity="0.5"
                                    stroke="#ffffff"
                                    strokeWidth="1"
                                />

                                {/* Spatial contour dots & labels */}
                                <circle
                                    cx="420"
                                    cy="220"
                                    r="45"
                                    fill="#EF4444"
                                    opacity="0.6"
                                />
                                <circle
                                    cx="420"
                                    cy="220"
                                    r="25"
                                    fill="#B91C1C"
                                    opacity="0.8"
                                />
                                <circle
                                    cx="360"
                                    cy="310"
                                    r="30"
                                    fill="#F59E0B"
                                    opacity="0.7"
                                />
                            </svg>

                            {/* Floating Map Legend Box Bottom Left */}
                            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-xs border border-slate-100 text-xs">
                                <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
                                    <Info className="w-4 h-4 text-emerald-700" />
                                    <span>Keterangan Peta</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 mb-2">
                                    Luas Serangan (Ha)
                                </p>

                                <div className="space-y-1.5 font-semibold text-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
                                        <span>0 - 10 Ha (Rendah)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
                                        <span>11 - 50 Ha (Waspada)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded bg-orange-500"></span>
                                        <span>51 - 100 Ha (Tinggi)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded bg-rose-600"></span>
                                        <span>&gt; 100 Ha (Sangat Tinggi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Prediction Results Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">
                            Prediksi Luas Serangan
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Hasil prediksi luas serangan periode 2024/2025
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-6">DESA</th>
                                    <th className="py-4 px-6">JENIS OPT</th>
                                    <th className="py-4 px-6 text-right">
                                        LUAS SERANGAN (HA)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-medium">
                                {predictionResults.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-slate-50/60 transition"
                                    >
                                        <td className="py-4 px-6 font-bold text-slate-900">
                                            {row.desa}
                                        </td>
                                        <td className="py-4 px-6 text-slate-700 font-semibold">
                                            {row.jenisOPT}
                                        </td>
                                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                                            {row.luas}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
                        <span>Menampilkan 1-10 dari 480 data</span>
                        <div className="flex items-center gap-1.5">
                            <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-slate-600 transition">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-[#006654] text-white font-bold flex items-center justify-center">
                                1
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center">
                                2
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center">
                                3
                            </button>
                            <span className="px-1 text-slate-400">...</span>
                            <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
