import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useSearch } from '@/hooks/useSearch';
import { Bug, Plus, Check } from 'lucide-react';

import OptTable from './components/OptTable';
import OptForm from './components/OptForm';
import OptDeleteModal from './components/OptDeleteModal';

export default function Index({ opts, search: initialSearch, flash }) {
    const [modalType, setModalType] = useState(null);
    const [selected, setSelected] = useState(null);

    const { searchValue, handleSearch } = useSearch('opt.index', initialSearch);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama_opt: '',
    });

    // ---- Modal helpers ----
    const openCreate = () => { clearErrors(); reset(); setSelected(null); setModalType('create'); };
    const openEdit   = (opt) => { clearErrors(); setData('nama_opt', opt.nama_opt); setSelected(opt); setModalType('edit'); };
    const openDelete = (opt) => { setSelected(opt); setModalType('delete'); };
    const closeModal = () => { setModalType(null); setSelected(null); clearErrors(); reset(); };

    const handleStore   = (e) => { e.preventDefault(); post(route('opt.store'), { onSuccess: closeModal }); };
    const handleUpdate  = (e) => { e.preventDefault(); put(route('opt.update', selected.id), { onSuccess: closeModal }); };
    const handleDestroy = ()  => { router.delete(route('opt.destroy', selected.id), { onSuccess: closeModal }); };

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

            <OptTable
                rows={opts.data}
                paginator={opts}
                searchValue={searchValue}
                onSearch={handleSearch}
                onEdit={openEdit}
                onDelete={openDelete}
            />

            <OptForm
                modalType={modalType}
                data={data}
                errors={errors}
                processing={processing}
                onChange={setData}
                onSubmit={modalType === 'create' ? handleStore : handleUpdate}
                onClose={closeModal}
            />

            <OptDeleteModal
                selected={modalType === 'delete' ? selected : null}
                onConfirm={handleDestroy}
                onClose={closeModal}
            />
        </AdminLayout>
    );
}
