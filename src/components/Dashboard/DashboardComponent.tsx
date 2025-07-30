import React from 'react';
import { FiCheckSquare, FiFileText, FiUsers } from 'react-icons/fi';
// import { useQuotationLogic } from '../components/Quotation/QuotationLogic';
// import { useClientLogic } from '@/components/Clients/ClientLogic';

function DashboardComponent() {
  // const { quotations } = useQuotationLogic()
  // const { clientData } =useClientLogic()
  // const totalQuotations = quotations.length
  // const totalClients = clientData.length

  return (
    <>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Total Invoices */}
        <div className="bg-white p-4 border border-gray-200 flex items-center space-x-4">
          <div className="p-2 bg-blue-600 text-white">
            <FiFileText size={20} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Invoices</h4>
            <p className="text-xl font-semibold text-gray-800">0</p>
          </div>
        </div>

        {/* Card 2: Quotations */}
        <div className="bg-white p-4 border border-gray-200 flex items-center space-x-4">
          <div className="p-2 bg-blue-600 text-white">
            <FiCheckSquare size={20} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Quotations</h4>
            <p className="text-xl font-semibold text-gray-800">00</p>
          </div>
        </div>

        {/* Card 3: Total Clients */}
        <div className="bg-white p-4 border border-gray-200 flex items-center space-x-4">
          <div className="p-2 bg-blue-600 text-white">
            <FiUsers size={20} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Clients</h4>
            <p className="text-xl font-semibold text-gray-800">00</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 sm:mt-8">
        <div className="bg-white p-4 sm:p-5 border border-gray-200 overflow-x-auto">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 sm:mb-4">Recent Activity</h2>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="min-w-full w-full text-sm">
              <thead>
                <tr className="text-gray-600 border-b border-gray-300 font-medium">
                  <th className="py-2 pr-4 text-left">#</th>
                  <th className="py-2 pr-4 text-left">Invoice ID</th>
                  <th className="py-2 pr-4 text-left">Client</th>
                  <th className="py-2 pr-4 text-left">Email</th>
                  <th className="py-2 pr-4 text-left">Date</th>
                  <th className="py-2 pr-4 text-left">Billed</th>
                  <th className="py-2 pr-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "INV-00123",
                    client: "John Doe",
                    email: "john@example.com",
                    date: "2025-06-12",
                    billed: "$1,200",
                    status: "Paid",
                    statusColor: "text-green-600",
                  },
                  {
                    id: "INV-00124",
                    client: "Jane Smith",
                    email: "jane@example.com",
                    date: "2025-06-11",
                    billed: "$850",
                    status: "Pending",
                    statusColor: "text-yellow-600",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 pr-4">{idx + 1}</td>
                    <td className="py-2 pr-4">{row.id}</td>
                    <td className="py-2 pr-4">{row.client}</td>
                    <td className="py-2 pr-4">{row.email}</td>
                    <td className="py-2 pr-4">{row.date}</td>
                    <td className="py-2 pr-4">{row.billed}</td>
                    <td className="py-2 pr-4">
                      <span className={`${row.statusColor} font-medium`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {[
              {
                id: "INV-00123",
                client: "John Doe",
                date: "2025-06-12",
                status: "Paid",
                statusColor: "text-green-600",
              },
              {
                id: "INV-00124",
                client: "Jane Smith",
                date: "2025-06-11",
                status: "Pending",
                statusColor: "text-yellow-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4"
              >
                <div className="text-sm text-gray-500">Invoice ID: {item.id}</div>
                <div className="text-base font-semibold text-gray-800">{item.client}</div>
                <div className="text-sm text-gray-600">Date: {item.date}</div>
                <div className={`text-sm font-medium ${item.statusColor}`}>Status: {item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardComponent;
