import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { UserCircle } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout currentTab="Profile">
            <Head title="Profile" />

            <div className="mb-6">
                <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <UserCircle className="h-6 w-6 text-primary-500" />
                    Pengaturan Profil
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Kelola informasi profil dan keamanan akun Anda.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 shadow-xs border border-slate-200 rounded-2xl">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-6 shadow-xs border border-slate-200 rounded-2xl">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white p-6 shadow-xs border border-slate-200 rounded-2xl">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
