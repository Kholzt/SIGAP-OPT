import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
export default function DataSeranganTable({ data }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="py-4 px-6">BULAN</th>
                            <th className="py-4 px-6">TAHUN</th>
                            <th className="py-4 px-6">DESA</th>
                            <th className="py-4 px-6">LUAS SERANGAN (HA)</th>
                            <th className="py-4 px-6">LUAS PUSO (HA)</th>
                            <th className="py-4 px-6">LUAS PENANGANAN (HA)</th>
                            <th className="py-4 px-6">JENIS OPT</th>
                            <th className="py-4 px-6 text-center">AKSI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-slate-50/60 transition"
                            >
                                <td className="py-4 px-6 text-slate-800 font-semibold">
                                    {row.bulan}
                                </td>
                                <td className="py-4 px-6 text-slate-600">
                                    {row.tahun}
                                </td>
                                <td className="py-4 px-6 font-bold text-slate-900">
                                    {row.desa}
                                </td>
                                <td className="py-4 px-6 text-slate-800">
                                    {row.luasSerangan}
                                </td>
                                <td className="py-4 px-6 text-slate-800">
                                    {row.luasPuso}
                                </td>
                                <td className="py-4 px-6 text-slate-800">
                                    {row.luasPenanganan}
                                </td>
                                <td className="py-4 px-6 font-semibold text-slate-800">
                                    {row.jenisOPT}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                        <button className="p-1.5 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
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
    );
}
