import SidebarMenu from "@/Components/SidebarMenu";
import { usePage } from "@inertiajs/react";
import { HelpCircle, LogOut, Menu } from "lucide-react";

export default function Sidebar({ navItems, currentTab, sidebarOpen, setSidebarOpen }) {
    {/* Sidebar */ }
    const groupedItems = Object.groupBy(navItems, (item) => item.groupName)
    const isOpenClass= sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 hidden lg:flex"
    return <aside
        className={`md:sticky absolute top-0 h-screen  z-40 w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto transition-all duration-300 ${isOpenClass}`}
    >
        <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-slate-100 relative">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    AgriPredict{" "}
                    <span className="text-emerald-600">GIS</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Admin Panel • Dinas Pertanian
                </p>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition focus:outline-none"
                    aria-label="Toggle Navigation"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4 space-y-1.5">
                {Object.entries(groupedItems).map(([groupName, items], index) => (
                    <div key={groupName} className={`space-y-1 `}>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-4 pb-1">
                            {groupName}
                        </h3>
                        {items.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.name;
                            return (
                                <SidebarMenu
                                    type={"default"}
                                    key={item.name}
                                    name={item.name}
                                    isActive={isActive}
                                    Icon={Icon}
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                ))}
            </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-slate-200/80 space-y-1">
            <SidebarMenu type={"default"} name={"Bantuan"} isActive={false} Icon={HelpCircle} href={"#"} />
            <SidebarMenu type={"logout"} name={"Keluar"} isActive={false} Icon={LogOut} href={"#"} />
        </div>
    </aside>
}