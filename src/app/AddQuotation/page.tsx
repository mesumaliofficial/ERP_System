"use client"
import Navbar from '@/components/common/layouts/Navbar';
import Sidebar from '@/components/common/layouts/Sidebar';
import AddQuotationForm from '@/components/Quotation/AddQuotationForm';
import React, { useState } from 'react'

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex relative">
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}
        <div className="fixed inset-y-0 top-6 z-40 w-[260px] left-0 right-0">
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        <main className={`transition-all duration-300 p-4 ${isSidebarOpen ? "md:ml-[260px] md:w-[calc(100%-260px)]" : "w-full ml-0"}`}>
          <div className="bg-white p-4 shadow rounded">
            <AddQuotationForm />
          </div>
        </main>
      </div>
    </>
  )
}

export default Page