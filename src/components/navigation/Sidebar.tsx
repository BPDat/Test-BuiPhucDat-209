"use client";

import { useState } from "react";
import { Home, Compass, User } from "lucide-react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("home");

  const menuItems = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "discover", label: "Khám phá", icon: Compass },
    { id: "profile", label: "Hồ sơ", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[240px] h-dvh bg-black border-r border-zinc-900 p-5 select-none shrink-0 justify-between">
      <div className="space-y-6">
        <div className="flex items-center px-2 py-4">
          <span className="text-2xl font-black tracking-tighter text-white relative">
            <span className="text-red-500 absolute -top-[1px] -left-[1.5px] select-none opacity-80">
              Test
            </span>
            <span className="text-cyan-400 absolute -bottom-[1px] -right-[1.5px] select-none opacity-80">
              Test
            </span>
            <span className="relative z-10 text-white">Test</span>
          </span>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-red-500 scale-102"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-6 border-t border-zinc-900/50">
        <p className="text-xs text-zinc-600 leading-relaxed">
          Test
        </p>
      </div>
    </aside>
  );
}
