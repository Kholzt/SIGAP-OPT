import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Calendar,
    Lock,
    SlidersHorizontal,
    Plus,
    Minus,
    Crosshair,
    Layers,
    Info
} from 'lucide-react';

export default function PublicMap() {
    const [activeTab, setActiveTab] = useState('Luas Serangan');
    const [desa, setDesa] = useState('Semua Desa');
    const [opt, setOpt] = useState('Wereng Batang Coklat (WBC)');
    const [periode, setPeriode] = useState('2024/2025');

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden font-sans bg-slate-900 text-slate-800">
            {/* Top Navigation Bar */}
            <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shrink-0 shadow-xs">
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                        AgriPredict <span className="text-emerald-700">GIS</span>
                    </Link>

                    {/* Navigation Tabs */}
                    <nav className="hidden md:flex items-center gap-8 h-16">
                        {['Luas Serangan', 'Puncak Serangan', 'Status Endemis'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-full text-sm font-semibold flex items-center border-b-2 transition ${
                                    activeTab === tab
                                        ? 'border-emerald-700 text-emerald-800 font-bold'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Mei 2024</span>
                    </div>

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 bg-[#006654] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005243] transition shadow-xs"
                    >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Admin Login</span>
                    </Link>
                </div>
            </header>

            {/* Main GIS Map Display Area */}
            <div className="flex-1 relative bg-[#1c2e26] overflow-hidden">
                {/* Simulated High-Res GIS Satellite Topographic Map */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950 via-slate-900 to-black opacity-90">
                    {/* SVG Topographic Overlay & Regional Risk Bubbles */}
                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="highRisk" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="mediumRisk" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="lowRisk" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                            </radialGradient>
                        </defs>

                        {/* Topo lines grid */}
                        <path d="M 100,200 Q 300,100 600,300 T 1100,200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                        <path d="M 50,400 Q 400,200 800,500 T 1150,450" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                        <path d="M 200,600 Q 500,400 900,700 T 1200,600" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

                        {/* Region Boundary Line */}
                        <polygon
                            points="250,150 480,120 780,220 850,550 600,720 200,650 120,400"
                            fill="rgba(16, 185, 129, 0.05)"
                            stroke="#F59E0B"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                        />

                        {/* Interactive Risk Circles / Buffer Zones */}
                        <circle cx="320" cy="520" r="140" fill="url(#lowRisk)" stroke="#10B981" strokeWidth="1.5" />
                        <circle cx="480" cy="360" r="95" fill="url(#mediumRisk)" stroke="#F59E0B" strokeWidth="1.5" />
                        <circle cx="680" cy="480" r="70" fill="url(#highRisk)" stroke="#EF4444" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Floating Top Right Filter Box */}
                <div className="absolute top-6 right-6 z-20 w-80 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-100">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                        <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                        <h3 className="text-sm font-bold text-slate-900">Filter Luas Serangan</h3>
                    </div>

                    <div className="space-y-3.5 text-xs">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                PILIH DESA
                            </label>
                            <select
                                value={desa}
                                onChange={(e) => setDesa(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Semua Desa">Semua Desa</option>
                                <option value="Bataan">Bataan</option>
                                <option value="Kademangan">Kademangan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                PILIH OPT
                            </label>
                            <select
                                value={opt}
                                onChange={(e) => setOpt(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Wereng Batang Coklat (WBC)">Wereng Batang Coklat (WBC)</option>
                                <option value="Tikus Sawah">Tikus Sawah</option>
                                <option value="Blast">Blast</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                PERIODE
                            </label>
                            <select
                                value={periode}
                                onChange={(e) => setPeriode(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="2024/2025">2024/2025</option>
                                <option value="2025/2026">2025/2026</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Floating Bottom Left Legend Box */}
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-100 max-w-xs text-xs">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
                        <Info className="w-4 h-4 text-emerald-700" />
                        <span>Keterangan Peta</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 mb-2">Luas Serangan (Ha)</p>

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

                {/* Bottom Right Map Controls */}
                <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg">
                        <Plus className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg">
                        <Minus className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-[#006654] text-white rounded-xl flex items-center justify-center hover:bg-[#005243] transition shadow-lg">
                        <Crosshair className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl text-slate-800 flex items-center justify-center hover:bg-white transition shadow-lg">
                        <Layers className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
