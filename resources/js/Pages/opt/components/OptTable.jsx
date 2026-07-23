import React from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function OptTable({ rows, paginator, searchValue, onSearch, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Search */}
            <div className="px-5 py-4 border-b border-slate-100">
                <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama OPT..."
                        value={searchValue}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                            <th className="px-5 py-3 text-left font-semibold w-12">#</th>
                            <th className="px-5 py-3 text-left font-semibold">Nama OPT</th>
                            <th className="px-5 py-3 text-left font-semibold">Dibuat</th>
                            <th className="px-5 py-3 text-right font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-5 py-12 text-center text-slate-400 text-sm">
                                    Tidak ada data OPT ditemukan.
                                </td>
                            </tr>
                        ) : (
                            rows.map((opt, idx) => (
                                <tr key={opt.id} className="hover:bg-slate-50 transition">
                                    <td className="px-5 py-3.5 text-slate-400 font-medium">{(paginator?.from ?? 1) + idx}</td>
                                    <td className="px-5 py-3.5 text-slate-800 font-semibold">{opt.nama_opt}</td>
                                    <td className="px-5 py-3.5 text-slate-500">
                                        {opt.created_at
                                            ? new Date(opt.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                                            : '-'}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => onEdit(opt)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </button>
                                            <button onClick={() => onDelete(opt)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition">
                                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                paginator={paginator}
                routeName="opt.index"
                routeParams={{ search: searchValue }}
            />
        </div>
    );
}
