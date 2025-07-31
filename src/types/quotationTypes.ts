export interface Item {
  productId: string;
  productName: string;
  ProductRate: string;
  ProductQty: string;
  ProductAmount: string;
}

export interface QuotationTypes {
  _id: string;
  quotationHeading: string;
  quotationNumber: string;
  issueDate: string;
  validTill: string;
  client: {
    name: string;
    company: string;
    contact: string;
    email: string;
  };
  items: {
    _key: string;
    itemName: string;
    itemRate: number;
    itemQty: number;
    itemAmount: number;
  }[];
  quotationConditions: string;
  tax: {
    isApplied: boolean;
    percentage: string;
    taxAmount: number
  };
  totals: {
    subTotal: number;
    grandTotal: number;
  };
}

export type QuotationItem = QuotationTypes["items"][number];

export interface QuotationPDFProps {
  data: QuotationTypes
}