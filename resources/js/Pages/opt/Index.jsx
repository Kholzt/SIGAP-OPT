import React, { useState, useCallback } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { MapPin, Plus, Pencil, Trash2, X, Check, AlertTriangle, Search, ChevronLeft, ChevronRight, Bug } from 'lucide-react';

export default function OptIndex({ opts, search: initialSearch, flash }) {
    const [modalType, setModalType] = useState(null);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState(initialSearch ?? '');
    const [searchTimer, setSearchTimer] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama_opt: '',
    });

    // ---- Server-side search with debounce ----
    const handleSearch = useCallback((value) => {
        setSearchValue(value);
        if (searchTimer) clearTimeout(searchTimer);
        const timer = setTimeout(() => {
            router.get(route('opt.index'), { search: value }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);
        setSearchTimer(timer);
    }, [searchTimer]);

    // ---- Pagination ----
    const goToPage = (url) => {
        if (!url) return;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    const { data: rows, links, meta } = opts;

    // Build smart page range (max 5 pages shown)
    const buildPages = () => {
        if (!meta) return [];
        const { current_page, last_page } = meta;
        let start = Math.max(1, current_page - 2);
        let end   = Math.min(last_page, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);
        const pages = [];
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    const pages = buildPages();

    // ---- Modal helpers ----
    const openCreate  = () => { clearErrors(); reset(); setSelected(null); setModalType('create'); };
    const openEdit    = (opt) => { clearErrors(); setData('nama_opt', opt.nama_opt); setSelected(opt); setModalType('edit'); };
    const openDelete  = (opt) => { setSelected(opt); setModalType('delete'); };
    const closeModal  = () => { setModalType(null); setSelected(null); clearErrors(); reset(); };

    const handleStore   = (e) => { e.preventDefault(); post(route('opt.store'), { onSuccess: closeModal }); };
    const handleUpdate  = (e) => { e.preventDefault(); put(route('opt.update', selected.id), { onSuccess: closeModal }); };
    const handleDestroy = ()  => { router.delete(route('opt.destroy', selected.id), { onSuccess: closeModal }); };

    const from  = meta?.from ?? 0;
    const to    = meta?.to   ?? 0;
    const total = meta?.total ?? 0;

    return (
        <AdminLayout currentTab="Data OPT">
            <Head title="Master Data OPT" />

            {flash?.success && (
                <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
                    <Check className="w-4 h-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Bug className="w-6 h-6 text-emerald-500" />
                        Master Data OPT
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola daftar Organisme Pengganggu Tumbuhan (OPT) yang terdaftar dalam sistem.</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm">
                    <Plus className="w-4 h-4" />
                    Tambah OPT
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Search */}
                <div className="px-5 py-4 border-b border-slate-100">
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama OPT..."
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
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
                                        <td className="px-5 py-3.5 text-slate-400 font-medium">{(from ?? 1) + idx}</td>
                                        <td className="px-5 py-3.5 text-slate-800 font-semibold">{opt.nama_opt}</td>
                                        <td className="px-5 py-3.5 text-slate-500">
                                            {opt.created_at ? new Date(opt.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEdit(opt)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                                                    <Pencil className="w-3.5 h-3.5" />Edit
                                                </button>
                                                <button onClick={() => openDelete(opt)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition">
                                                    <Trash2 className="w-3.5 h-3.5" />Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
                    <span>
                        {total > 0 ? `Menampilkan ${from}-${to} dari ${total} data` : 'Tidak ada data'}
                    </span>
                    {meta && meta.last_page > 1 && (
                        <div className="flex items-center gap-1.5">
                            {/* Prev */}
                            <button
                                onClick={() => goToPage(links.prev)}
                                disabled={!links.prev}
                                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-slate-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* First page shortcut */}
                            {pages[0] > 1 && (
                                <>
                                    <button
                                        onClick={() => router.get(route('opt.index'), { search: searchValue, page: 1 }, { preserveState: true })}
                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                                    >1</button>
                                    {pages[0] > 2 && <span className="px-1 text-slate-400">...</span>}
                                </>
                            )}

                            {/* Page numbers */}
                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get(route('opt.index'), { search: searchValue, page }, { preserveState: true })}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition ${
                                        page === meta.current_page
                                            ? 'bg-[#006654] text-white shadow-sm'
                                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Last page shortcut */}
                            {pages[pages.length - 1] < meta.last_page && (
                                <>
                                    {pages[pages.length - 1] < meta.last_page - 1 && <span className="px-1 text-slate-400">...</span>}
                                    <button
                                        onClick={() => router.get(route('opt.index'), { search: searchValue, page: meta.last_page }, { preserveState: true })}
                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                                    >{meta.last_page}</button>
                                </>
                            )}

                            {/* Next */}
                            <button
                                onClick={() => goToPage(links.next)}
                                disabled={!links.next}
                                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Create / Edit */}
            {(modalType === 'create' || modalType === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-slate-900">
                                {modalType === 'create' ? 'Tambah OPT Baru' : 'Edit OPT'}
                            </h2>
                            <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={modalType === 'create' ? handleStore : handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Nama OPT <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_opt}
                                    onChange={(e) => setData('nama_opt', e.target.value)}
                                    placeholder="Contoh: Tikus"
                                    maxLength={100}
                                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${errors.nama_opt ? 'border-rose-400 bg-rose-50' : 'border-slate-200'}`}
                                />
                                {errors.nama_opt && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.nama_opt}</p>}
                                <p className="mt-1 text-xs text-slate-400">{data.nama_opt.length}/100 karakter</p>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing} className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-60">
                                    {processing ? 'Menyimpan...' : modalType === 'create' ? 'Simpan' : 'Perbarui'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Delete */}
            {modalType === 'delete' && selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                        <div className="mx-auto w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                            <AlertTriangle className="w-7 h-7 text-rose-500" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-1">Hapus OPT?</h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Data <span className="font-semibold text-slate-800">"{selected.nama_opt}"</span> akan dihapus permanen.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button onClick={closeModal} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                                Batal
                            </button>
                            <button onClick={handleDestroy} className="px-5 py-2 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition">
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
