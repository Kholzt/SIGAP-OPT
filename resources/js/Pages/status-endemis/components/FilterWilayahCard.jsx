import React from "react";

export default function FilterWilayahCard({
    allKecamatan = [],
    allOPT = [],
    musimList = [],
    selectedKecamatan,
    setSelectedKecamatan,
    selectedOPTId,
    setSelectedOPTId,
    selectedMusim,
    setSelectedMusim,
}) {
    return (
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
                        onChange={(e) => setSelectedKecamatan(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
                    >
                        <option value="">Semua Desa / Kecamatan</option>
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
                        onChange={(e) => setSelectedOPTId(e.target.value)}
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
                        onChange={(e) => setSelectedMusim(e.target.value)}
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
    );
}
