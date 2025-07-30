import { InputField, TextAreaField } from '../common/ui/InputAndTextArea';
import SuccessDialog from '../common/ui/SuccessDialog';
import { Quotation } from './useQuotation';

function AddQuotationForm() {
  const {
    quotationHeading, setQuotationHeading,
    setQuotationNumber,
    issueDate, setIssueDate,
    validTill, setValidTill,
    clientName, setClientName,
    clientCompany, setClientCompany,
    clientContact, setClientContact,
    clientEmail, setClientEmail,
    items,
    subTotal, grandTotal,
    quotationConditions, setQuotationConditions,
    setIsTaxApplied, isTaxApplied,
    taxPercentage, setTaxPercentage,
    loading,
    showSuccess, setShowSuccess,
    quotations,
    handleAddItem, handleRemoveItem, handleItemChange, handleSubmit
  } = Quotation();

  const totalQuotation = quotations?.length ? String(quotations.length + 1).padStart(3, '0') : '001';

  return (
    <div className="p-4 md:p-6 bg-white">
      <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
        {/* Quotation Detail */}
        <div className="border-b border-gray-200 pb-6 md:pb-8 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">Add Quotation</h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <InputField id="quotationHeading" label="Quotation Heading" placeholder="Enter Quotation Heading" value={quotationHeading} onChange={(e) => setQuotationHeading(e.target.value)} />
            <InputField id="quotationNumber" label="Quotation Number" placeholder="Enter Quotation Number" value={`QUO-${totalQuotation}`} onChange={(e) => setQuotationNumber(e.target.value)} />
            <InputField id="quotationIssueDate" label="Date of Issue" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            <InputField id="quotationValidTill" label="Valid Till" type="date" value={validTill} onChange={(e) => setValidTill(e.target.value)} />
          </div>
        </div>

        {/* Client Details */}
        <div className="border-b border-gray-200 pb-6 md:pb-8 mb-6 md:mb-8">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4 md:mb-6">Client Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <InputField id="clientName" label="Client Name" placeholder="Enter Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            <InputField id="clientCompany" label="Company Name" placeholder="Enter Company Name" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} />
            <InputField id="clientContact" label="Client Contact" type="tel" placeholder="Enter Contact Number" value={clientContact} onChange={(e) => setClientContact(e.target.value)} />
            <InputField id="clientEmail" label="Client Email" type="email" placeholder="Enter Email Address" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
          </div>
        </div>

        {/* Quotation Items */}
        <div className="border-b border-gray-200 pb-6 md:pb-8 mb-6 md:mb-8">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4 md:mb-6">Product Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-xs font-medium uppercase tracking-wide text-left">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Product Details</th>
                  <th className="px-3 py-2">Rate (₨)</th>
                  <th className="px-3 py-2">Quantity</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, idx) => (
                  <tr className="hover:bg-gray-50" key={item.productId}>
                    <td className="px-3 py-3 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-3 py-3"><InputField id="productName" value={item.productName} onChange={(e) => handleItemChange(item.productId, 'productName', e.target.value)} placeholder="Enter Product Name" className="min-w-[150px] md:min-w-[300px] text-sm" /></td>
                    <td className="px-3 py-3"><InputField id="productRate" value={item.ProductRate} placeholder="Rate" type="number" className="text-sm" onChange={(e) => handleItemChange(item.productId, 'ProductRate', e.target.value)} /></td>
                    <td className="px-3 py-3"><InputField id="productQty" value={item.ProductQty} placeholder="Quantity" type="number" className="text-sm" onChange={(e) => handleItemChange(item.productId, 'ProductQty', e.target.value)} /></td>
                    <td className="px-3 py-3"><InputField id="productAmount" value={item.ProductAmount} placeholder="Amount" type="number" className="text-sm" onChange={(e) => handleItemChange(item.productId, 'ProductAmount', e.target.value)} /></td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => handleRemoveItem(item.productId)} className="bg-[#1E90FF] py-1.5 px-3 rounded-md text-white hover:bg-[#1873CF] font-medium text-sm transition-colors duration-150 cursor-pointer">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row */}
          <div className="flex justify-start mt-4">
            <button type="button" onClick={handleAddItem} className="inline-flex items-center px-3 py-1.5 bg-[#E6F0FA] text-[#1E90FF] text-sm font-medium rounded-md hover:bg-[#D1E4F5] transition-colors duration-150 cursor-pointer">+ Add Row</button>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-md space-y-4 bg-white p-4 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-800">Sub Total Amount:</span><span className="text-sm bg-gray-100 text-gray-900 font-semibold px-3 py-1.5 rounded-md">Rs.{subTotal}</span></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Apply Tax:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={(e) => setIsTaxApplied(e.target.checked)} />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-400 peer-checked:bg-[#1E90FF] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
              {isTaxApplied && <input type="number" placeholder="Enter Tax %" value={taxPercentage} onChange={(e) => setTaxPercentage(e.target.value)} className="bg-[#f5f5f5] w-auto md:w-28 px-2 py-2 border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#1E90FF] focus:outline-none" />}
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2"><span className="text-md font-semibold text-gray-800">Grand Total:</span><span className="text-md text-white font-semibold bg-[#1E90FF] px-3 py-1.5 rounded-md">Rs.{grandTotal}</span></div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="pb-6 md:pb-8">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4 md:mb-6">Terms & Conditions</h2>
          <TextAreaField id="quotationConditions" placeholder="Enter terms and conditions" value={quotationConditions} onChange={(e) => setQuotationConditions(e.target.value)} />
          <div className="flex justify-end mt-4"><button type="submit" className="bg-[#1E90FF] text-white py-1.5 px-4 rounded-md hover:bg-[#1873CF] text-sm font-medium transition-colors duration-150 cursor-pointer">{loading ? 'Save Quotation...' : 'Save Quotation'}</button></div>
        </div>
      </form>

      {showSuccess && <SuccessDialog title="Quotation Saved!" message="Your quotation has been successfully saved." buttonText="Done" onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

export default AddQuotationForm;
