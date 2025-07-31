import { defineField, defineType } from "sanity";

export const AddQuotation = defineType({
  name: "addQuotation",
  title: "Add Quotation",
  type: "document",
  fields: [
    defineField({
      name: "quotationHeading",
      title: "Quotation Heading",
      type: "string",
    }),

    defineField({
      name: "quotationNumber",
      title: "Quotation Number",
      type: "string",
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
    }),
    defineField({
      name: "validTill",
      title: "Valid Till",
      type: "date",
      options: {
        dateFormat: "DD-MM-YYYY",
      },
    }),

    // Client Info
    defineField({
      name: "client",
      title: "Client Details",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Client Name", type: "string" }),
        defineField({ name: "email", title: "Client Email", type: "string" }),
        defineField({
          name: "contact",
          title: "Client Contact",
          type: "string",
        }),
        defineField({
          name: "company",
          title: "Client Company",
          type: "string",
        }),
      ],
    }),

    // Items
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          name: "quotationItem",
          type: "object",
          title: "Quotation Item",
          fields: [
            defineField({
              name: "itemName",
              title: "Item Name",
              type: "string",
            }),
            defineField({
              name: "itemRate",
              title: "Item Rate",
              type: "number",
            }),
            defineField({
              name: "itemQty",
              title: "Item Quantity",
              type: "number",
            }),
            defineField({
              name: "itemAmount",
              title: "Item Amount",
              type: "number",
            }),
          ],
        },
      ],
    }),

    // Tax Fields
    defineField({
      name: "tax",
      title: "Tax",
      type: "object",
      fields: [
        defineField({
          name: "isApplied",
          title: "Apply Tax?",
          type: "boolean",
        }),
        defineField({
          name: "percentage",
          title: "Tax Percentage",
          type: "string",
        }),
        defineField({
          name: "taxAmount",
          title: "Tax Amount",
          type: "number",
        }),
      ],
    }),

    // Terms
    defineField({
      name: "quotationConditions",
      title: "Quotation Conditions",
      type: "text",
    }),

    // Totals
    defineField({
      name: "totals",
      title: "Totals",
      type: "object",
      fields: [
        defineField({
          name: "subTotal",
          title: "Sub Total",
          type: "number"
        }),
        defineField({
          name: "grandTotal",
          title: "Grand Total",
          type: "number"
        })
      ],
    }),

  ],
});
