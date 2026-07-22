import React, { useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

import {
    Plus,
    FileSpreadsheet,
    FileText,
    Filter,
    RotateCcw,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Bug,
    AlertTriangle,
    Clock,
} from "lucide-react";

export default function DataSerangan({ allKecamatan, allOPT }) {
    const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah");
    const [selectedOPT, setSelectedOPT] = useState("Semua Jenis");

    const tableData = [
        {
            id: 1,
            bulan: "Maret",
            tahun: 2024,
            desa: "Bataan",
            luasSerangan: "12.5",
            luasPuso: "0",
            luasPenanganan: "10.2",
            jenisOPT: "Wereng Batang Coklat",
        },
        {
            id: 2,
            bulan: "Maret",
            tahun: 2024,
            desa: "Dawuhan",
            luasSerangan: "4.2",
            luasPuso: "0",
            luasPenanganan: "4.2",
            jenisOPT: "Tikus Sawah",
        },
        {
            id: 3,
            bulan: "Februari",
            tahun: 2024,
            desa: "Kademangan",
            luasSerangan: "8.7",
            luasPuso: "0",
            luasPenanganan: "5.0",
            jenisOPT: "Blast",
        },
        {
            id: 4,
            bulan: "Februari",
            tahun: 2024,
            desa: "Jurang sapi",
            luasSerangan: "15.0",
            luasPuso: "1.2",
            luasPenanganan: "12.0",
            jenisOPT: "Penggerek Batang",
        },
        {
            id: 5,
            bulan: "Januari",
            tahun: 2024,
            desa: "Wonosari",
            luasSerangan: "6.4",
            luasPuso: "0",
            luasPenanganan: "6.4",
            jenisOPT: "Tungro",
        },
    ];

    return (
        <AdminLayout currentTab="Data Serangan OPT">
            <Head title="Data Serangan OPT" />

            <div className="space-y-6">
                {/* Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <nav className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span className="text-emerald-700">
                                Manajemen OPT
                            </span>
                        </nav>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <button className="flex items-center gap-2 bg-[#006654] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#005243] transition shadow-xs">
                            <Plus className="w-4 h-4" /> Tambah Data
                        </button>
                        <button className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-xs">
                            <FileSpreadsheet className="w-4 h-4" /> Import Excel
                        </button>
                        <button className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-xs">
                            <FileText className="w-4 h-4" /> Export PDF
                        </button>
                    </div>
                </div>

                {/* 3 Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                            <Bug className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                Total Laporan Bulan Ini
                            </p>
                            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                                1,248
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-16 h-16 bg-teal-50 rounded-tl-full opacity-50 -z-0"></div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-rose-100/70 text-rose-700 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                Status Waspada Tinggi
                            </p>
                            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                                12 Wilayah
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-16 h-16 bg-rose-50 rounded-tl-full opacity-50 -z-0"></div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                Update Terakhir
                            </p>
                            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                                2 Menit Lalu
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-16 h-16 bg-blue-50 rounded-tl-full opacity-50 -z-0"></div>
                    </div>
                </div>

                {/* Filter Section */}
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
                                onChange={(e) =>
                                    setSelectedWilayah(e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Semua Wilayah">
                                    Semua Wilayah
                                </option>
                                {allKecamatan.map((kecamatan) => (
                                    <option
                                        key={kecamatan.id}
                                        value={kecamatan.id}
                                    >
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

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-6">BULAN</th>
                                    <th className="py-4 px-6">TAHUN</th>
                                    <th className="py-4 px-6">DESA</th>
                                    <th className="py-4 px-6">
                                        LUAS SERANGAN (HA)
                                    </th>
                                    <th className="py-4 px-6">
                                        LUAS PUSO (HA)
                                    </th>
                                    <th className="py-4 px-6">
                                        LUAS PENANGANAN (HA)
                                    </th>
                                    <th className="py-4 px-6">JENIS OPT</th>
                                    <th className="py-4 px-6 text-center">
                                        AKSI
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-medium">
                                {tableData.map((row) => (
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
            </div>
        </AdminLayout>
    );
}
