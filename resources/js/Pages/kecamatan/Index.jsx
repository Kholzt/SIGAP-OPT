import React, { useState, useCallback } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from '@/Components/Pagination';

import {
    MapPin,
    Plus,
    Pencil,
    Trash2,
    X,
    Check,
    AlertTriangle,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Index({
    kecamatans,
    search: initialSearch,
    flash,
}) {
    const [modalType, setModalType] = useState(null);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState(initialSearch ?? "");
    const [searchTimer, setSearchTimer] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nama_kecamatan: "",
        });

    // ---- Server-side search with debounce ----
    const handleSearch = useCallback(
        (value) => {
            setSearchValue(value);
            if (searchTimer) clearTimeout(searchTimer);
            const timer = setTimeout(() => {
                router.get(
                    route("kecamatan.index"),
                    { search: value },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    },
                );
            }, 400);
            setSearchTimer(timer);
        },
        [searchTimer],
    );


    const { data: rows, links, meta } = kecamatans;

    // ---- Modal helpers ----
    const openCreate = () => {
        clearErrors();
        reset();
        setSelected(null);
        setModalType("create");
    };
    const openEdit = (kec) => {
        clearErrors();
        setData("nama_kecamatan", kec.nama_kecamatan);
        setSelected(kec);
        setModalType("edit");
    };
    const openDelete = (kec) => {
        setSelected(kec);
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType(null);
        setSelected(null);
        clearErrors();
        reset();
    };

    const handleStore = (e) => {
        e.preventDefault();
        post(route("kecamatan.store"), { onSuccess: closeModal });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("kecamatan.update", selected.id), { onSuccess: closeModal });
    };
    const handleDestroy = () => {
        router.delete(route("kecamatan.destroy", selected.id), {
            onSuccess: closeModal,
        });
    };

    const from = meta?.from ?? 0;
    const to = meta?.to ?? 0;
    const total = meta?.total ?? 0;

    return (
        <AdminLayout currentTab="Data Kecamatan">
            <Head title="Master Data Kecamatan" />

            {flash?.success && (
                <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
                    <Check className="w-4 h-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-emerald-500" />
                        Master Data Kecamatan
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Kelola daftar wilayah kecamatan yang terdaftar dalam
                        sistem.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Kecamatan
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Search */}
                <div className="px-5 py-4 border-b border-slate-100">
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama kecamatan..."
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
                                <th className="px-5 py-3 text-left font-semibold w-12">
                                    #
                                </th>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Nama Kecamatan
                                </th>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Dibuat
                                </th>
                                <th className="px-5 py-3 text-right font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-12 text-center text-slate-400 text-sm"
                                    >
                                        Tidak ada data kecamatan ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                rows.map((kec, idx) => (
                                    <tr
                                        key={kec.id}
                                        className="hover:bg-slate-50 transition"
                                    >
                                        <td className="px-5 py-3.5 text-slate-400 font-medium">
                                            {(from ?? 1) + idx}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-800 font-semibold">
                                            {kec.nama_kecamatan}
                                        </td>
                                        <td className="px-5 py-3.5 text-slate-500">
                                            {kec.created_at
                                                ? new Date(
                                                    kec.created_at,
                                                ).toLocaleDateString(
                                                    "id-ID",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    },
                                                )
                                                : "-"}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        openEdit(kec)
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openDelete(kec)
                                                    }
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
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

                <Pagination
                    meta={kecamatans}
                    links={links}
                    onPageChange={(pageOrUrl, isPageNum = false) => {
                        if (isPageNum) {
                            router.get(route('kecamatan.index'), { search: searchValue, page: pageOrUrl }, { preserveState: true, preserveScroll: true });
                        } else {
                            router.get(pageOrUrl, {}, { preserveState: true, preserveScroll: true });
                        }
                    }}
                />
            </div>

            {/* Modal Create / Edit */}
            {(modalType === "create" || modalType === "edit") && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-slate-900">
                                {modalType === "create"
                                    ? "Tambah Kecamatan Baru"
                                    : "Edit Kecamatan"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={
                                modalType === "create"
                                    ? handleStore
                                    : handleUpdate
                            }
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Nama Kecamatan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_kecamatan}
                                    onChange={(e) =>
                                        setData(
                                            "nama_kecamatan",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Contoh: Kecamatan Banjarmasin Selatan"
                                    maxLength={100}
                                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${errors.nama_kecamatan ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
                                />
                                {errors.nama_kecamatan && (
                                    <p className="mt-1.5 text-xs text-rose-600 font-medium">
                                        {errors.nama_kecamatan}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-slate-400">
                                    {data.nama_kecamatan.length}/100 karakter
                                </p>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-60"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : modalType === "create"
                                            ? "Simpan"
                                            : "Perbarui"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Delete */}
            {modalType === "delete" && selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                        <div className="mx-auto w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                            <AlertTriangle className="w-7 h-7 text-rose-500" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-1">
                            Hapus Kecamatan?
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Data{" "}
                            <span className="font-semibold text-slate-800">
                                "{selected.nama_kecamatan}"
                            </span>{" "}
                            akan dihapus permanen.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDestroy}
                                className="px-5 py-2 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
