// src/components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#fef9f0] p-5 flex flex-col justify-between shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-[#ff6b6b] mb-6">Menu</h2>

        <input
          type="text"
          placeholder="Search..."
          className="w-full mb-6 px-3 py-2 border border-[#ffd6a5] rounded focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-gray-800"
        />

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#ff9f1c] mb-2">Tasks</h3>
          <ul className="space-y-1 text-[#333]">
            <li className="hover:text-[#ff6b6b] cursor-pointer">📅 Upcoming</li>
            <li className="hover:text-[#ff6b6b] cursor-pointer">📌 Today</li>
            <li className="hover:text-[#ff6b6b] cursor-pointer">🗓️ Calendar</li>
            <li className="font-bold text-[#e76f51]">🧱 Sticky Wall</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#ff9f1c] mb-2">Lists</h3>
          <ul className="space-y-1 text-[#333]">
            <li>Personal</li>
            <li>Work</li>
            <li>List 1</li>
            <li>
              <a href="#" className="text-[#00b4d8] hover:underline">➕ Add New List</a>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#ff9f1c] mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#ffd6a5] text-[#5a3e36] px-2 py-1 rounded text-xs">Tag 1</span>
            <span className="bg-[#caffbf] text-[#22543d] px-2 py-1 rounded text-xs">Tag 2</span>
            <span className="bg-[#bdb2ff] text-[#2a2a72] px-2 py-1 rounded text-xs cursor-pointer hover:bg-[#a0a0ff]">+ Add Tag</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-[#6b705c] space-y-2">
        <a href="#" className="hover:text-[#3a86ff]">⚙️ Settings</a>
        <a href="#" className="hover:text-[#d00000]">🚪 Sign out</a>
      </div>
    </aside>
  );
};

export default Sidebar;
