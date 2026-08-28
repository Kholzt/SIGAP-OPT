import { Link } from "@inertiajs/react";

export default function SidebarMenu({ name, href, Icon, isActive, type }) {
    const menuClass = type == "default" ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900" : "text-rose-600 hover:bg-rose-50"
    const iconClass = type == "default" ? "text-slate-500" : "text-rose-500"
    return <Link
        key={name}
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
            ? "bg-[#6EE7B7] text-slate-900 shadow-xs"
            : menuClass
            }`}
    >
        <Icon
            className={`w-5 h-5 ${isActive ? "text-slate-900" : iconClass}`}
        />
        <span>{name}</span>
    </Link>
}