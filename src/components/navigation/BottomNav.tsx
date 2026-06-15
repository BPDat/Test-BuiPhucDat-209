"use client";

import { useState } from "react";
import { Home, Compass, User, Plus, MessageSquare } from "lucide-react";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 w-full h-14 bg-black border-t border-zinc-900 z-50 flex md:hidden items-center justify-around select-none">

      <button
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors duration-150 ${
          activeTab === "home" ? "text-white" : "text-zinc-500"
        }`}
      >
        <Home className="w-5.5 h-5.5" />
        <span className="text-[10px] mt-0.5 font-medium">Trang chủ</span>
      </button>


      <button
        onClick={() => setActiveTab("discover")}
        className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors duration-150 ${
          activeTab === "discover" ? "text-white" : "text-zinc-500"
        }`}
      >
        <Compass className="w-5.5 h-5.5" />
        <span className="text-[10px] mt-0.5 font-medium">Khám phá</span>
      </button>


      <button className="relative w-11 h-7 flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-100">
        <div className="absolute inset-0 bg-cyan-400 rounded-lg translate-x-[-3px]" />
        <div className="absolute inset-0 bg-red-500 rounded-lg translate-x-[3px]" />
        <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center z-10">
          <Plus className="w-5 h-5 text-black stroke-[3]" />
        </div>
      </button> 

      <button
        onClick={() => setActiveTab("inbox")}
        className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors duration-150 ${
          activeTab === "inbox" ? "text-white" : "text-zinc-500"
        }`}
      >
        <MessageSquare className="w-5.5 h-5.5" />
        <span className="text-[10px] mt-0.5 font-medium">Hộp thư</span>
      </button>

      <button
        onClick={() => setActiveTab("profile")}
        className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors duration-150 ${
          activeTab === "profile" ? "text-white" : "text-zinc-500"
        }`}
      >
        <User className="w-5.5 h-5.5" />
        <span className="text-[10px] mt-0.5 font-medium">Hồ sơ</span>
      </button>
    </nav>
  );
}
