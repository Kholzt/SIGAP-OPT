import React from "react";
import { X, FileSpreadsheet, UploadCloud } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function DataSeranganImportModal({
    isOpen,
    onClose,
    onImport,
    processing,
}) {
    if (!isOpen) return null;

    const { post, processing: isImporting } = useForm();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <form onSubmit={onImport} className="w-full max-w-md">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
                    <div className="absolute right-4 top-4">
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mt-2">
                        <FileSpreadsheet className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">
                        Import Data Serangan
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Unggah file Excel (.xlsx atau .xls) yang berisi data
                        serangan OPT.
                    </p>
                    <label htmlFor="file">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 mb-6 hover:bg-slate-50 transition cursor-pointer flex flex-col items-center">
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <span className="text-sm font-medium text-slate-600">
                                Klik atau seret file ke sini
                            </span>
                            <span className="text-xs text-slate-400 mt-1">
                                Maks. 5MB
                            </span>
                        </div>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="hidden"
                            accept=".xlsx,.xls"
                        />
                    </label>
                    <div className="flex justify-between items-center text-xs text-emerald-600 font-semibold mb-6">
                        <a href="#" className="hover:underline">
                            Download Template Excel
                        </a>
                    </div>
                    <div className="flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={isImporting}
                            className="flex-1 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-60"
                        >
                            {isImporting ? "Mengimpor..." : "Import Data"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
