import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

/**
 * Komponen filter data serangan — wilayah, OPT, dan pencarian teks.
 */
export default function FilterDataSerangan({
    allKecamatan = [],
    allOPT = [],
    allMusim = [],
    selectedKecamatan,
    setSelectedKecamatan,
    selectedOPT,
    setSelectedOPT,
    selectedMusim,
    setSelectedMusim,
    searchValue,
    setSearchValue,
    onFilter,
    onReset,
}) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">Filter Data Serangan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Search */}
                <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Cari
                    </label>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onFilter()}
                        placeholder="Kecamatan atau OPT..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                {/* Musim */}
                <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Musim Tanam
                    </label>
                    <select
                        value={selectedMusim}
                        onChange={(e) => setSelectedMusim(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">Semua Musim</option>
                        {allMusim.map((kec) => (
                            <option key={kec} value={kec}>{kec}</option>
                        ))}
                    </select>
                </div>
                {/* Kecamatan */}
                <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Wilayah / Kecamatan
                    </label>
                    <select
                        value={selectedKecamatan}
                        onChange={(e) => setSelectedKecamatan(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">Semua Wilayah</option>
                        {allKecamatan.map((kec) => (
                            <option key={kec.id} value={kec.id}>{kec.nama_kecamatan}</option>
                        ))}
                    </select>
                </div>

                {/* OPT */}
                <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Jenis OPT
                    </label>
                    <select
                        value={selectedOPT}
                        onChange={(e) => setSelectedOPT(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">Semua Jenis</option>
                        {allOPT.map((opt) => (
                            <option key={opt.id} value={opt.id}>{opt.nama_opt}</option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="md:col-span-3 flex items-center gap-2">
                    <button
                        onClick={onFilter}
                        className="flex-1 bg-[#006654] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#005243] transition shadow-xs"
                    >
                        Terapkan
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition"
                        title="Reset Filter"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
