// lib/sanityClient.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-07-27',
  token: process.env.SANITY_API_TOKEN,
})
