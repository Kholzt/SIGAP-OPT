import React from 'react';
import { X } from 'lucide-react';

/**
 * Form popup untuk tambah / edit data serangan OPT.
 * Field mengikuti fillable model HistoriSerangan.
 */
export default function DataSeranganForm({
    modalType,
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    onClose,
    allKecamatan = [],
    allOPT = [],
    bulanOptions = [],
}) {
    if (modalType !== 'create' && modalType !== 'edit') return null;

    const isCreate = modalType === 'create';

    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-slate-900">
                        {isCreate ? 'Tambah Data Serangan' : 'Edit Data Serangan'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Bulan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Bulan <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.bulan}
                                onChange={(e) => onChange('bulan', e.target.value)}
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.bulan ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            >
                                <option value="">Pilih Bulan</option>
                                {bulanOptions.map((b) => (
                                    <option key={b.value} value={b.value}>{b.label}</option>
                                ))}
                            </select>
                            {errors.bulan && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.bulan}</p>
                            )}
                        </div>

                        {/* Tahun */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Tahun <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.tahun}
                                onChange={(e) => onChange('tahun', e.target.value)}
                                placeholder="Contoh: 2024"
                                min="1900"
                                max="2100"
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.tahun ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            />
                            {errors.tahun && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.tahun}</p>
                            )}
                        </div>

                        {/* Kecamatan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Kecamatan <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.kecamatan_id}
                                onChange={(e) => onChange('kecamatan_id', e.target.value)}
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.kecamatan_id ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            >
                                <option value="">Pilih Kecamatan</option>
                                {allKecamatan.map((kec) => (
                                    <option key={kec.id} value={kec.id}>{kec.nama_kecamatan}</option>
                                ))}
                            </select>
                            {errors.kecamatan_id && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.kecamatan_id}</p>
                            )}
                        </div>

                        {/* Jenis OPT */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Jenis OPT <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.opt_id}
                                onChange={(e) => onChange('opt_id', e.target.value)}
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.opt_id ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            >
                                <option value="">Pilih OPT</option>
                                {allOPT.map((opt) => (
                                    <option key={opt.id} value={opt.id}>{opt.nama_opt}</option>
                                ))}
                            </select>
                            {errors.opt_id && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.opt_id}</p>
                            )}
                        </div>

                        {/* Musim Tanaman */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Musim Tanaman <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={data.musim_tanaman}
                                onChange={(e) => onChange('musim_tanaman', e.target.value)}
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.musim_tanaman ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            >
                                <option value="">Pilih Musim Tanam</option>
                                <option value="MP">Musim Penghujan (MP)</option>
                                <option value="MK">Musim Kemarau (MK)</option>
                            </select>
                            {errors.musim_tanaman && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.musim_tanaman}</p>
                            )}
                        </div>

                        {/* Jumlah Serangan */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Luas Serangan (HA) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.jumlah_serangan}
                                onChange={(e) => onChange('jumlah_serangan', e.target.value)}
                                placeholder="0.00"
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.jumlah_serangan ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            />
                            {errors.jumlah_serangan && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.jumlah_serangan}</p>
                            )}
                        </div>

                        {/* Luas Puso */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Luas Puso (HA) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.luas_puso}
                                onChange={(e) => onChange('luas_puso', e.target.value)}
                                placeholder="0.00"
                                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                                    errors.luas_puso ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                                }`}
                            />
                            {errors.luas_puso && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.luas_puso}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition disabled:opacity-60 flex items-center gap-2"
                        >
                            {processing ? 'Menyimpan...' : isCreate ? 'Simpan' : 'Perbarui'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
