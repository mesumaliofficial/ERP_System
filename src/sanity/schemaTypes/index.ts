import { type SchemaTypeDefinition } from 'sanity'
import { AddQuotation } from './schemas/quotation/addQuotation'
import AddClient from './schemas/client/AddClient'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [AddQuotation, AddClient],
}
