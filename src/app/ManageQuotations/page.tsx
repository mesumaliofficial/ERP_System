"use client";

import { useState } from "react";
import Navbar from "@/components/common/layouts/Navbar";
import Sidebar from "@/components/common/layouts/Sidebar";
import ManageQuotation from "@/components/Quotation/ManageQuotation";

const ManageQuotations = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="fixed inset-y-0 top-6 z-40 w-[260px] left-0 right-0">
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        <main
          className={`transition-all duration-300 p-4 ${isSidebarOpen
              ? "md:ml-[260px] md:w-[calc(100%-260px)]"
              : "w-full ml-0"
            }`}
        >
          <div className="bg-white shadow rounded">
            <div className="mt-0 mx-auto">
                <ManageQuotation />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManageQuotations;
