import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { Download, ChevronDown } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function PuncakSerangan() {
    const [periode, setPeriode] = useState('2025/2026');
    const [desa, setDesa] = useState('Desa A');
    const [opt, setOpt] = useState('Tikus Sawah');

    const chartData = {
        labels: ['OKT', 'NOV', 'DES', 'JAN', 'FEB', 'MAR'],
        datasets: [
            {
                label: 'Intensitas Serangan',
                data: [42, 65, 110, 32, 58, 70],
                backgroundColor: [
                    '#DCE6F8',
                    '#DCE6F8',
                    '#006654', // Dark Teal peak bar
                    '#DCE6F8',
                    '#DCE6F8',
                    '#DCE6F8',
                ],
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { family: 'Poppins', size: 11, weight: '600' },
                    color: '#64748B',
                },
            },
            y: {
                display: false,
                grid: { display: false },
            },
        },
    };

    const matrixData = [
        { id: 1, desa: 'Badean', blas: 'Mei', hdb: 'Mei', pbp: 'Januari', tikus: 'Februari', tungro: 'Agustus', wbc: 'Februari' },
        { id: 2, desa: 'Baratan', blas: 'Februari', hdb: 'Mei', pbp: 'Mei', tikus: 'Agustus', tungro: 'Mei', wbc: 'Februari' },
        { id: 3, desa: 'Bendelan', blas: 'April', hdb: 'April', pbp: 'Februari', tikus: 'Agustus', tungro: 'April', wbc: 'Agustus' },
        { id: 4, desa: 'Binakal', blas: 'Juni', hdb: 'Juni', pbp: 'Februari', tikus: 'September', tungro: 'Mei', wbc: 'Agustus' },
        { id: 5, desa: 'Gadingsari', blas: 'Maret', hdb: 'Agustus', pbp: 'Januari', tikus: 'Agustus', tungro: 'September', wbc: 'Maret' },
        { id: 6, desa: 'Jeruksoksok', blas: 'Januari', hdb: 'Mei', pbp: 'Januari', tikus: 'September', tungro: 'September', wbc: 'Januari' },
        { id: 7, desa: 'Kembangan', blas: 'Juni', hdb: 'Juni', pbp: 'Februari', tikus: 'September', tungro: 'Juni', wbc: 'Agustus' },
        { id: 8, desa: 'Sumbertengah', blas: 'Januari', hdb: 'Agustus', pbp: 'Januari', tikus: 'Agustus', tungro: 'Februari', wbc: 'Februari' },
        { id: 9, desa: 'Sumberwaru', blas: 'Mei', hdb: 'Juni', pbp: 'Februari', tikus: 'Agustus', tungro: 'Februari', wbc: 'Mei' },
    ];

    return (
        <AdminLayout currentTab="Puncak Serangan">
            <div className="space-y-6">
                {/* Seasonal Chart Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Grafik Intensitas Serangan Per Musim
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Data kumulatif serangan OPT dalam satu siklus musim tanam
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    PERIODE
                                </label>
                                <select
                                    value={periode}
                                    onChange={(e) => setPeriode(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="2025/2026">2025/2026</option>
                                    <option value="2024/2025">2024/2025</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    PILIH DESA
                                </label>
                                <select
                                    value={desa}
                                    onChange={(e) => setDesa(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="Desa A">Desa A</option>
                                    <option value="Badean">Badean</option>
                                    <option value="Baratan">Baratan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    PILIH OPT
                                </label>
                                <select
                                    value={opt}
                                    onChange={(e) => setOpt(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="Tikus Sawah">Tikus Sawah</option>
                                    <option value="WBC">Wereng Batang Coklat</option>
                                    <option value="BLAS">BLAS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Matrix Table Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-slate-900">Prakiraan Puncak Serangan OPT</h2>
                        <button className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-xs self-start sm:self-auto">
                            <Download className="w-4 h-4" /> Ekspor Data
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6 text-center w-12">NO</th>
                                    <th className="py-3.5 px-6">DESA</th>
                                    <th className="py-3.5 px-6">BLAS</th>
                                    <th className="py-3.5 px-6">HDB</th>
                                    <th className="py-3.5 px-6">PBP</th>
                                    <th className="py-3.5 px-6">TIKUS</th>
                                    <th className="py-3.5 px-6">TUNGRO</th>
                                    <th className="py-3.5 px-6">WBC</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-medium">
                                {matrixData.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 px-6 text-center text-slate-500 font-semibold">
                                            {row.id}
                                        </td>
                                        <td className="py-4 px-6 font-bold text-slate-900">{row.desa}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.blas}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.hdb}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.pbp}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.tikus}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.tungro}</td>
                                        <td className="py-4 px-6 text-slate-700">{row.wbc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
