"use client";

import { QuotationTypes } from "@/types/quotationTypes";
import { createContext, useContext, useState } from "react";

interface QuotationContextType {
  isEditing: boolean;
  editableQuotation: QuotationTypes | null;
  setIsEditing: (value: boolean) => void;
  setEditableQuotation: (data: QuotationTypes | null) => void;
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined)

export default function QuotationProvider({children}: {children: React.ReactNode}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableQuotation, setEditableQuotation] = useState<QuotationTypes | null>(null);

    return (
        <QuotationContext.Provider value={{isEditing, editableQuotation, setIsEditing, setEditableQuotation}}>
            {children}
        </QuotationContext.Provider>
    )
}


export const useQuotationContext = () => {
    const context = useContext(QuotationContext);
    if (!context) {
        throw new Error("useQuotationContext must be used within a QuotationProvider");
    }
    return context;
}