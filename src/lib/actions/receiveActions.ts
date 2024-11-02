import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { mints } from "$lib/stores/persistent/mints"

export const createMintQuote = async (mintUrl: string, amount : number, options?: {unit?: string}) => {
    const wallet = mints.getWalletWithUnit(mintUrl, options?.unit)
    const quote = await wallet?.createMintQuote(amount)
    if (!quote) {
        throw new Error(`Error when creating mint quote for ${mintUrl}`)
    }
    const quoteToStore = {...quote,createdAt: Date.now(), mintUrl, unit: options?.unit??'sat', amount}
    mintQuotesStore.addOrUpdate(quote.quote, quoteToStore , "quote")
    return quoteToStore
} 