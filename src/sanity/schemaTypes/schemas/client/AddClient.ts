import { defineField, defineType } from "sanity";

export default defineType({
  name: "addClient",
  title: "Add Client",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "clientEmail",
      title: "Client Email",
      type: "string",
    }),
    defineField({
      name: "clientPhone",
      title: "Client Phone",
      type: "string",
    }),
    defineField({
        name: "clientAddress",
        title: "Client Address",
        type: "string",
    })
  ],
});