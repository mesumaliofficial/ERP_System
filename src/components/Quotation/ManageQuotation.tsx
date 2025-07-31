"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Quotation } from "./useQuotation";
import DeleteDialog from "../common/ui/DeleteDialog";
import Loader from "../common/ui/Loader";
import { useQuotationContext } from './QuotationContext'
import { QuotationTypes } from "@/types/quotationTypes";
import SuccessDialog from "../common/ui/SuccessDialog";

function ManageQuotation() {
  const { quotations, confirmDelete, cancelDelete, deleteRequest, showDialog, loading, showSuccess, setShowSuccess } = Quotation();
  const { setIsEditing, setEditableQuotation } = useQuotationContext();

  const handleEdit = (item: QuotationTypes) => {
    setEditableQuotation(item)
    setIsEditing(true)
  }

  return (
    <div className="p-4 md:p-6 relative">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
        Manage Quotation
      </h2>

      <div className="relative">
        {loading && (
          <>
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40" />
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <Loader />
            </div>
          </>
        )}
        {/* Quotation Table */}
        <div className={`${loading ? "pointer-events-none opacity-70" : ""} overflow-x-auto`}>
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300 text-sm font-semibold">
                <th className="py-2 pr-4 text-left">#</th>
                <th className="py-2 pr-4 text-left">Quotation ID</th>
                <th className="py-2 pr-4 text-left">Client</th>
                <th className="py-2 pr-4 text-left">Date</th>
                <th className="py-2 pr-4 text-left">Amount</th>
                <th className="py-2 pr-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations?.map((item, index) => (
                <tr className="border-b border-gray-300 hover:bg-gray-50 text-[15px]" key={item._id}>
                  <td className="py-2 pr-4">{index + 1}</td>
                  <td className="py-2 pr-4">{item.quotationNumber}</td>
                  <td className="py-2 pr-4">{item.client?.name}</td>
                  <td className="py-2 pr-4">{new Date(item.issueDate).toLocaleDateString('en-US')}</td>
                  <td className="py-2 pr-4">Rs.{item.totals?.grandTotal}</td>
                  <td className="py-2 space-x-2 flex items-center cursor-pointer">
                    <button title="Edit" onClick={() => handleEdit(item)}>
                      <FaEdit className="hover:text-[#1E90FF] cursor-pointer" />
                    </button>

                    <button title="Delete" onClick={() => deleteRequest(item._id)}>
                      <FaTrash className="hover:text-red-500 cursor-pointer" />
                    </button>

                    <button title="Download">
                      <MdDownload className="hover:text-[#1873CF] cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDialog && (
          <DeleteDialog
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this Quotation?"
          />
        )}

        {/* Message */}
        {showSuccess && (
          <SuccessDialog title="Quotation Delete" message="Quotation has been delete successfully." buttonText="Ok" onClose={() => setShowSuccess(false)} />
        )}
      </div>
    </div>
  );
}

export default ManageQuotation;
