import React, { useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { X, FileSpreadsheet, UploadCloud, CheckCircle } from 'lucide-react';

/**
 * Modal import data serangan dari file Excel/CSV.
 * POST ke route('data-serangan.import') dengan field 'file'.
 */
export default function DataSeranganImportModal({ isOpen, onClose }) {
    const inputRef  = useRef(null);
    const [file,        setFile]        = useState(null);
    const [processing,  setProcessing]  = useState(false);
    const [dragOver,    setDragOver]    = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setFile(null);
        setProcessing(false);
        onClose();
    };

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) setFile(selected);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) setFile(dropped);
    };

    const handleImport = () => {
        if (!file) return;
        setProcessing(true);

        const formData = new FormData();
        formData.append('file', file);

        router.post(route('data-serangan.import'), formData, {
            forceFormData: true,
            onSuccess: handleClose,
            onFinish:  () => setProcessing(false),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                {/* Close */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon + Title */}
                <div className="flex flex-col items-center text-center mb-5 mt-2">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                        <FileSpreadsheet className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Import Data Serangan</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Unggah file <span className="font-semibold">.xlsx, .xls, atau .csv</span> maks. 5MB.
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 mb-4 flex flex-col items-center cursor-pointer transition ${
                        dragOver ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {file ? (
                        <>
                            <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                            <span className="text-sm font-semibold text-emerald-700">{file.name}</span>
                            <span className="text-xs text-slate-400 mt-1">
                                {(file.size / 1024).toFixed(1)} KB — Klik untuk ganti
                            </span>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <span className="text-sm font-medium text-slate-600">Klik atau seret file ke sini</span>
                            <span className="text-xs text-slate-400 mt-1">.xlsx, .xls, .csv — Maks. 5MB</span>
                        </>
                    )}
                </div>

                {/* Template link */}
                <div className="text-center mb-5">
                    <a
                        href="#"
                        className="text-xs font-semibold text-emerald-600 hover:underline"
                        onClick={(e) => e.preventDefault()}
                    >
                        Download Template Excel
                    </a>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleImport}
                        disabled={!file || processing}
                        className="flex-1 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Mengimpor...' : 'Import Data'}
                    </button>
                </div>
            </div>
        </div>
    );
}
