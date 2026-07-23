import React from 'react';
import { X } from 'lucide-react';

export default function OptForm({ modalType, data, errors, processing, onChange, onSubmit, onClose }) {
    if (modalType !== 'create' && modalType !== 'edit') return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-slate-900">
                        {modalType === 'create' ? 'Tambah OPT Baru' : 'Edit OPT'}
                    </h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Nama OPT <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nama_opt}
                            onChange={(e) => onChange('nama_opt', e.target.value)}
                            placeholder="Contoh: Tikus"
                            maxLength={100}
                            className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${errors.nama_opt ? 'border-rose-400 bg-rose-50' : 'border-slate-200'}`}
                        />
                        {errors.nama_opt && (
                            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.nama_opt}</p>
                        )}
                        <p className="mt-1 text-xs text-slate-400">{data.nama_opt.length}/100 karakter</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                            Batal
                        </button>
                        <button type="submit" disabled={processing} className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-60">
                            {processing ? 'Menyimpan...' : modalType === 'create' ? 'Simpan' : 'Perbarui'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
