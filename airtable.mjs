import Airtable from 'airtable'

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyIwpcQ1fBXlxCcq',
})

const base = (baseId) => Airtable.base(baseId)

export default base