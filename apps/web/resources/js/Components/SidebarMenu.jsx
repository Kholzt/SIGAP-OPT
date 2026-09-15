import { Link } from "@inertiajs/react";

export default function SidebarMenu({ name, href, Icon, isActive, type }) {
    const menuClass = type == "default" ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-rose-400 hover:bg-slate-800 hover:text-rose-300"
    const iconClass = type == "default" ? "text-slate-500" : "text-rose-500"
    return <Link
        key={name}
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
            ? "bg-primary-600 text-white shadow-sm ring-1 ring-primary-500/50"
            : menuClass
            }`}
    >
        <Icon
            className={`w-5 h-5 ${isActive ? "text-white" : iconClass}`}
        />
        <span>{name}</span>
    </Link>
}
