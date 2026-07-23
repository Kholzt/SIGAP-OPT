import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DataSeranganDeleteModal({ selected, onConfirm, onClose }) {
    if (!selected) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-7 h-7 text-rose-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Hapus Data?</h2>
                <p className="text-sm text-slate-500 mb-6">
                    Data serangan bulan <span className="font-semibold text-slate-800">{selected.bulan} {selected.tahun}</span> akan dihapus permanen.
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="px-5 py-2 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
