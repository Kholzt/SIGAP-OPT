import { Head } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

import { FileSpreadsheet, FileText, Plus } from "lucide-react";
import DataSeranganImportModal from "./components/DataSeranganImportModal";
import DataSeranganTable from "./components/DataSeranganTable";
import FilterDataSerangan from "./components/FilterDataSerangan";
import SummaryCard from "./components/SummaryCard";
import { useDataSerangan } from "@/hooks/useDataSerangan";

export default function DataSerangan({ allKecamatan, allOPT }) {
    const {
        selectedWilayah,
        setSelectedWilayah,
        selectedOPT,
        setSelectedOPT,
        isOpen,
        setIsOpen,
        data,
    } = useDataSerangan();

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
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-xs"
                        >
                            <FileSpreadsheet className="w-4 h-4" /> Import Excel
                        </button>
                        <button className="flex items-center gap-2 bg-white text-emerald-800 border border-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-xs">
                            <FileText className="w-4 h-4" /> Export PDF
                        </button>
                    </div>
                </div>

                {/* 3 Summary Cards */}
                <SummaryCard />

                {/* Filter Section */}
                <FilterDataSerangan
                    allKecamatan={allKecamatan}
                    allOPT={allOPT}
                    setSelectedOPT={setSelectedOPT}
                    setSelectedWilayah={setSelectedWilayah}
                    selectedOPT={selectedOPT}
                    selectedWilayah={selectedWilayah}
                />

                <DataSeranganImportModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />

                {/* Data Table */}
                <DataSeranganTable data={data} />
            </div>
        </AdminLayout>
    );
}
