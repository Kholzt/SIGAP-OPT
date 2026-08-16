import React from "react";
import { Download } from "lucide-react";
import StatusBadge from "../../../Components/StatusBadge";

export default function StatusEndemisTable({
    allKecamatan = [],
    allOPT = [],
    selectedKecamatan = "",
    selectedMusim = "2024/2025",
    statusMatrix = {},
}) {
    const filteredKecamatans = selectedKecamatan
        ? allKecamatan.filter((k) => String(k.id) === String(selectedKecamatan))
        : allKecamatan;

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
            `Status_Endemis_Bondowoso_${selectedMusim.replace("/", "_")}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
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
                                                statusMatrix[kec.id]?.[o.id] ||
                                                "Aman";
                                            return (
                                                <td
                                                    key={o.id}
                                                    className="py-4 px-4 text-center whitespace-nowrap"
                                                >
                                                    <StatusBadge status={status} />
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
    );
}
