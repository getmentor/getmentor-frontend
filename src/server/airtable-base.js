import Airtable from 'airtable'

const TEST = process.env.NEXT_PUBLIC_TESTING_MODE

export const airtableBase =
  TEST === 'on'
    ? null
    : new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
