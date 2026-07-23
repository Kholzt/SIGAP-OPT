import Pagination from "@/Components/Pagination";
import { Pencil, Rows3Icon, Trash2 } from "lucide-react";

const BULAN_NAMES = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

/**
 * Tabel data serangan OPT dengan pagination.
 * Kolom: # | Bulan | Tahun | Kecamatan | Musim Tanaman | Luas Serangan | Luas Puso | OPT | Aksi
 */
export default function DataSeranganTable({
    rows = [],
    paginator,
    onEdit,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="py-4 px-5 w-10 text-center">#</th>
                            <th className="py-4 px-5">Bulan</th>
                            <th className="py-4 px-5">Tahun</th>
                            <th className="py-4 px-5">Kecamatan</th>
                            <th className="py-4 px-5">Musim Tanaman</th>
                            <th className="py-4 px-5">Luas Serangan (HA)</th>
                            <th className="py-4 px-5">Luas Puso (HA)</th>
                            <th className="py-4 px-5">Jenis OPT</th>
                            <th className="py-4 px-5 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium">
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="px-6 py-14 text-center text-slate-400 text-sm"
                                >
                                    Tidak ada data serangan ditemukan.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-slate-50/60 transition"
                                >
                                    <td className="py-4 px-5 text-center text-slate-400 font-medium">
                                        {(paginator?.from ?? 1) + idx}
                                    </td>
                                    <td className="py-4 px-5 text-slate-800 font-semibold">
                                        {BULAN_NAMES[row.bulan - 1] ??
                                            row.bulan}
                                    </td>
                                    <td className="py-4 px-5 text-slate-600">
                                        {row.tahun}
                                    </td>
                                    <td className="py-4 px-5 font-bold text-slate-900">
                                        {row.kecamatan?.nama_kecamatan ?? "-"}
                                    </td>
                                    <td className="py-4 px-5 text-slate-700">
                                        {row.musim_tanaman}
                                    </td>
                                    <td className="py-4 px-5 text-slate-800">
                                        {row.jumlah_serangan}
                                    </td>
                                    <td className="py-4 px-5 text-slate-800">
                                        {row.luas_puso}
                                    </td>
                                    <td className="py-4 px-5 font-semibold text-slate-800">
                                        {row.opt?.nama_opt ?? "-"}
                                    </td>
                                    <td className="py-4 px-5 text-center">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() =>
                                                    onEdit(Rows3Icon)
                                                }
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />{" "}
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />{" "}
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {paginator && (
                <Pagination paginator={paginator} routeName="data-serangan" />
            )}
        </div>
    );
}
