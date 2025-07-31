import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuotationTypes, Item } from "@/types/quotationTypes";

export const Quotation = () => {
  // ===== Static Quotation Info =====
  const [quotationHeading, setQuotationHeading] = useState("");
  const [quotationNumber, setQuotationNumber] = useState("QUO-001");
  const [issueDate, setIssueDate] = useState("");
  const [validTill, setValidTill] = useState("");

  // ===== Client Info =====
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // ===== Tax and Conditions =====
  const [quotationConditions, setQuotationConditions] = useState("");
  const [isTaxApplied, setIsTaxApplied] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("");

  // ===== UI State =====
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // ===== Dialog State for Confirming Deletion =====
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ===== Existing Quotations State =====
  const [quotations, setQuotations] = useState<QuotationTypes[] | null>([]);

  // ===== Items State =====
  const [items, setItems] = useState<Item[]>([
    {
      productId: uuidv4(),
      productName: "",
      ProductRate: "",
      ProductQty: "",
      ProductAmount: "",
    },
  ]);

  // ===== Add New Product Item =====
  const handleAddItem = () => {
    const newItem: Item = {
      productId: uuidv4(),
      productName: "",
      ProductRate: "",
      ProductQty: "",
      ProductAmount: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  // ===== Remove Item Row by ID =====
  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== id));
  };

  // ===== Update Individual Item =====
  const handleItemChange = (id: string, field: keyof Item, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === id) {
          const updated = { ...item, [field]: value };
          const rate = Number(updated.ProductRate) || 0;
          const qty = Number(updated.ProductQty) || 0;
          updated.ProductAmount = (rate * qty).toFixed();
          return updated;
        }
        return item;
      })
    );
  };

  // ===== Calculate Subtotal and Grand Total =====
  const calculateTotal = (): { subTotal: number; grandTotal: number } => {
    const subTotal = items.reduce(
      (acc, item) => acc + Number(item.ProductAmount || 0),
      0
    );
    const tax = isTaxApplied && taxPercentage
      ? (subTotal * Number(taxPercentage)) / 100
      : 0;

    return {
      subTotal,
      grandTotal: subTotal + tax,
    };
  };

  const { subTotal, grandTotal } = calculateTotal();

  // ===== Submit Quotation to API =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: QuotationTypes = {
      _id: uuidv4(),
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client: {
        name: clientName,
        company: clientCompany,
        contact: clientContact,
        email: clientEmail,
      },
      items: items.map((item) => ({
        _key: item.productId,
        itemName: item.productName,
        itemRate: Number(item.ProductRate),
        itemQty: Number(item.ProductQty),
        itemAmount: Number(item.ProductAmount),
      })),
      quotationConditions,
      tax: {
        isApplied: isTaxApplied,
        percentage: taxPercentage,
      },
      totals: {
        subTotal,
        grandTotal,
      },
    };

    try {
      const res = await fetch("/api/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Quotation has been saved successfully");
        setShowSuccess(true);
        resetForm();
        fetchQuotations();
      }
    } catch (err) {
      console.error("Failed to submit quotation:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Reset Entire Form State =====
  const resetForm = () => {
    setQuotationHeading("");
    setQuotationNumber("");
    setIssueDate("");
    setValidTill("");
    setClientName("");
    setClientCompany("");
    setClientContact("");
    setClientEmail("");
    setQuotationConditions("");
    setIsTaxApplied(false);
    setTaxPercentage("");
    setItems([
      {
        productId: uuidv4(),
        productName: "",
        ProductRate: "",
        ProductQty: "",
        ProductAmount: "",
      },
    ]);
  };

  // ===== Fetch All Quotations from API =====
  const fetchQuotations = async () => {
    try {
      const res = await fetch("/api/quotation");
      const data = await res.json();
      if (data.success) {
        setQuotations(data.quotations);
        console.log(data.quotations);
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };

  // ===== Trigger Delete Dialog =====
  const deleteRequest = (id: string) => {
    setSelectedId(id);
    setShowDialog(true);
  };

  // ===== Delete Quotation By ID =====
  const handleDeleteQuotaion = async (_id: string) => {
    if (!_id) return alert("Invalid ID");
    setLoading(true);

    try {
      const res = await fetch("/api/quotation", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      });

      const result = await res.json();
      if (result.success) {
        fetchQuotations();
        setShowSuccess(true)
        setMessage("Quotation has been delete successfully.");
      } else {
        alert("Failed to delete Quotation");
      }
    } catch (err) {
      console.error("Quotation not deleted.", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Confirm Deletion From Dialog =====
  const confirmDelete = () => {
    if (selectedId) {
      handleDeleteQuotaion(selectedId);
      setSelectedId(null);
      setShowDialog(false);
    }
  };

  // ===== Cancel Deletion Dialog =====
  const cancelDelete = () => {
    setSelectedId(null);
    setShowDialog(false);
  };

  // ===== Set Today's Date as Default Issue Date =====
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setIssueDate(formatted);
  }, []);

  // ===== Fetch Quotations on Mount =====
  useEffect(() => {
    fetchQuotations();
  }, []);

  // ===== Get Quotation Number =====
  useEffect(() => {
    if (quotations && quotationNumber === "") {
      const totalQuotation = String(quotations.length + 1).padStart(3, '0');
      setQuotationNumber(`QUO-${totalQuotation}`);
    }
  }, [quotations]);

  // =====  Quotation Form Update =====

  const handleUpdate = async (id: string) => {
    setLoading(true);
    const payload: QuotationTypes = {
      _id: id,
      quotationHeading,
      quotationNumber,
      issueDate,
      validTill,
      client: {
        name: clientName,
        company: clientCompany,
        contact: clientContact,
        email: clientEmail,
      },
      items: items.map((item) => ({
        _key: item.productId,
        itemName: item.productName,
        itemRate: Number(item.ProductRate),
        itemQty: Number(item.ProductQty),
        itemAmount: Number(item.ProductAmount),
      })),
      quotationConditions,
      tax: {
        isApplied: isTaxApplied,
        percentage: taxPercentage,
      },
      totals: {
        subTotal,
        grandTotal,
      },
    };

    try {
      const res = await fetch("/api/quotation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        resetForm();
        fetchQuotations();
        setShowSuccess(true);
        setMessage("Quotation has been update successfully");
      }
    } catch (err) {
      console.error("Failed to update quotation:", err);
    } finally {
      setLoading(false);
    }
  }


  // ===== Return All States and Handlers to Component =====
  return {
    quotationHeading,
    setQuotationHeading,
    quotationNumber,
    setQuotationNumber,
    issueDate,
    setIssueDate,
    validTill,
    setValidTill,
    clientName,
    setClientName,
    clientCompany,
    setClientCompany,
    clientContact,
    setClientContact,
    clientEmail,
    setClientEmail,
    quotationConditions,
    setQuotationConditions,
    isTaxApplied,
    setIsTaxApplied,
    taxPercentage,
    setTaxPercentage,
    items,
    cancelDelete,
    handleItemChange,
    handleAddItem,
    deleteRequest,
    confirmDelete,
    subTotal,
    grandTotal,
    loading,
    quotations,
    showSuccess,
    setShowDialog,
    setShowSuccess,
    handleSubmit,
    handleRemoveItem,
    showDialog,
    selectedId,
    setSelectedId,
    setItems,
    message,
    handleUpdate,
  };
};