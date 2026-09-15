import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-primary-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-8 py-8 shadow-2xl border border-slate-200 sm:max-w-md rounded-2xl">
                {children}
            </div>
        </div>
    );
}
