import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Bug, Check, FileSpreadsheet, FileText, Plus } from "lucide-react";

import { useDataSerangan } from "@/hooks/useDataSerangan";
import SummaryCard from "./components/SummaryCard";
import FilterDataSerangan from "./components/FilterDataSerangan";
import DataSeranganTable from "./components/DataSeranganTable";
import DataSeranganForm from "./components/DataSeranganForm";
import DataSeranganDeleteModal from "./components/DataSeranganDeleteModal";
import DataSeranganImportModal from "./components/DataSeranganImportModal";
import Alert from "@/Components/Alert";

export default function DataSerangan({
    allKecamatan,
    allOPT,
    dataSerangan,
    filters,
    flash,
}) {
    const ds = useDataSerangan(filters ?? {});

    return (
        <AdminLayout currentTab="Data Serangan OPT">
            <Head title="Data Serangan OPT" />

            <div className="space-y-6">
                {/* Flash success */}
                <Alert type="success" message={flash?.success} />
                <Alert type="error" message={flash?.error} />

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
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mt-1">
                            <Bug className="w-6 h-6 text-emerald-500" />
                            Data Serangan OPT
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Kelola histori data serangan Organisme Pengganggu
                            Tumbuhan.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <button
                            onClick={ds.openCreate}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Tambah Data
                        </button>
                        <button
                            onClick={ds.openImport}
                            className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition shadow-sm"
                        >
                            <FileSpreadsheet className="w-4 h-4" /> Import Excel
                        </button>
                        <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition shadow-sm">
                            <FileText className="w-4 h-4" /> Export PDF
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <SummaryCard />

                {/* Filter */}
                <FilterDataSerangan
                    allKecamatan={allKecamatan}
                    allOPT={allOPT}
                    selectedKecamatan={ds.selectedKecamatan}
                    setSelectedKecamatan={ds.setSelectedKecamatan}
                    selectedOPT={ds.selectedOPT}
                    setSelectedOPT={ds.setSelectedOPT}
                    searchValue={ds.searchValue}
                    setSearchValue={ds.setSearchValue}
                    onFilter={ds.handleFilter}
                    onReset={ds.handleResetFilter}
                />

                {/* Data Table */}
                <DataSeranganTable
                    rows={dataSerangan?.data ?? []}
                    paginator={dataSerangan}
                    onEdit={ds.openEdit}
                    onDelete={ds.openDelete}
                />
            </div>

            {/* Modals */}
            <DataSeranganForm
                modalType={ds.modalType}
                data={ds.data}
                errors={ds.errors}
                processing={ds.processing}
                onChange={ds.setData}
                onSubmit={
                    ds.modalType === "create" ? ds.handleStore : ds.handleUpdate
                }
                onClose={ds.closeModal}
                allKecamatan={allKecamatan}
                allOPT={allOPT}
                bulanOptions={ds.BULAN_OPTIONS}
            />

            <DataSeranganDeleteModal
                selected={ds.modalType === "delete" ? ds.selected : null}
                onConfirm={ds.handleDestroy}
                onClose={ds.closeModal}
            />

            <DataSeranganImportModal
                isOpen={ds.modalType === "import"}
                onClose={ds.closeModal}
            />
        </AdminLayout>
    );
}
