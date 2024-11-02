import { mintQuotesStore } from "$lib/stores/persistent/mintquotes"
import { createMintsStore, mints } from "$lib/stores/persistent/mints"

export const init = async () => {
    await initStores()
}

const initStores = async () => {
    await mints.init()
    await mintQuotesStore.init()
}