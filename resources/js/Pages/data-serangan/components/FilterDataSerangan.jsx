import { Filter, RotateCcw } from "lucide-react";
export default function FilterDataSerangan({
    selectedWilayah,
    setSelectedWilayah,
    selectedOPT,
    setSelectedOPT,
    allKecamatan,
    allOPT,
}) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-800" />
                <h3 className="text-base font-bold text-slate-900">
                    Filter Data Serangan
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-4">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Wilayah / Kecamatan
                    </label>
                    <select
                        value={selectedWilayah}
                        onChange={(e) => setSelectedWilayah(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="Semua Wilayah">Semua Wilayah</option>
                        {allKecamatan.map((kecamatan) => (
                            <option key={kecamatan.id} value={kecamatan.id}>
                                {kecamatan.nama_kecamatan}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-4">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Jenis OPT
                    </label>
                    <select
                        value={selectedOPT}
                        onChange={(e) => setSelectedOPT(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="Semua Jenis">Semua Jenis</option>
                        {allOPT.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.nama_opt}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-4 flex items-center gap-2">
                    <button className="flex-1 bg-[#006654] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#005243] transition shadow-xs">
                        Terapkan Filter
                    </button>
                    <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition">
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
