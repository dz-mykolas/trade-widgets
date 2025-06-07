// src/components/Layout/Header.js

"use client";

import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useWidgetStore } from '@/hooks/useWidgetStore';

export default function Header() {
  const resetWidgets = useWidgetStore((state) => state.resetWidgets);

  const handleResetClick = () => {
    if (window.confirm('Are you sure you want to reset all widget positions?')) {
      resetWidgets();
    }
  };

  return (
    <header className="flex items-center z-10 gap-1">
      <h1 className="text-xl pr-1 pl-4 font-normal text-white">Cultz Trenches</h1>
      <div className="flex items-center gap-6">
        <nav className="flex items-center text-sm">
          <button className="px-3 py-1 text-gray-500 text-xs font-semibold rounded-md hover:bg-gray-700 transition-colors">
            Watching
          </button>
          <button className="px-3 py-1 bg-[#1f1f2b] text-gray-500 font-medium rounded-md hover:bg-blue-700 transition-colors">
            Positions
          </button>
        </nav>
      </div>
      <div className="flex items-center justify-end flex-1 gap-2">
        <div className="relative">
          <button className="flex items-center h-[40px] rounded-xl bg-[#16161f] text-gray-300 placeholder-gray-500 w-48 gap-1 p-2">
            <FaSearch className="text-gray-500 text-xs" />
            <div className="text-gray-500 text-xs font-medium">Search token</div>
          </button>
        </div>

        <button
          onClick={handleResetClick}
          className="h-[40px] px-4 bg-red-600/80 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200 text-xs"
          title="Reset all widget positions and states"
        >
          Reset Layout
        </button>
        
      </div>
    </header>
  );
}
