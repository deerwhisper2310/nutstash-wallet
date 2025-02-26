<script lang="ts">
    import { formatAmount } from "$lib/util/walletUtils";
    import {
        ArrowDownRight,
        ArrowUpRight,
        Banknote,
        Zap,
        Timer,
        X,
        HandCoins,
    } from "lucide-svelte";
    import { formatDistance } from "date-fns";
    import { now } from "$lib/stores/session/time";
    import {
    EXPIRED,
        type StoredMeltQuote,
        type StoredMintQuote,
        type StoredTransaction,
    } from "$lib/db/models/types";
    interface Props {item: StoredTransaction | StoredMeltQuote | StoredMintQuote}
    
    let {item}: Props = $props();

    let isExpired = $derived(
        item.type === "mint" &&
        item.state === EXPIRED.EXPIRED
    )
    const getUrlForItem = (
        item: StoredTransaction | StoredMeltQuote | StoredMintQuote,
    ): string => {
        if (item.type === "mint") {
            return `/#/wallet/receive/ln/${item.quote}`;
        } else if (item.type === "melt") {
            return `/#/wallet/send/ln/${item.quote}`;
        } else if (item.type === "receive") {
            return `/#/wallet/send/cashu/${item.id}`;
        } else if (item.type === "send") {
            return `/#/wallet/send/cashu/${item.id}`;
        } else {
            return `/#/wallet/`;
        }
    };
</script>

<a
    class="border rounded-xl p-5 w-full flex justify-between items-center"
    class:opacity-50={isExpired}
    href={getUrlForItem(item)}
>
    {#if item.type === "mint"}
        <div class="relative">
            <Zap class="text-yellow-500"></Zap>
            <div class="absolute -top-1 -left-2">
                <ArrowDownRight class="w-4 h-4 text-green-600"
                ></ArrowDownRight>
            </div>
            {#if item.state === "UNPAID"}
                <div class="absolute -top-1 -right-3">
                    <Timer class="w-4 h-4"></Timer>
                </div>
                {#if isExpired}
                    <div class="absolute -top-2 -right-4">
                        <X class="w-6 h-6 text-red-600"></X>
                    </div>
                {/if}
            {:else if item.state==='PAID'}
                <div class="absolute -top-1 -right-3">
                    <HandCoins class="w-4 h-4"></HandCoins>
                </div>
            {/if}

        </div>
    {:else if item.type === "melt"}
        <div class="relative">
            <Zap class="text-yellow-500"></Zap>
            <div class="absolute -top-1 -left-2">
                <ArrowUpRight class="w-4 h-4 text-red-600"
                ></ArrowUpRight>
            </div>
            {#if item.state === "UNPAID"}
                <div class="absolute -top-1 -right-3">
                    <Timer class="w-4 h-4"></Timer>
                </div>
                {#if isExpired}
                    <div class="absolute -top-2 -right-4">
                        <X class="w-6 h-6 text-red-600"></X>
                    </div>
                {/if}
            {:else if item.state==='PAID'}
                <!-- <div class="absolute -top-1 -right-3">
                    <Check class="w-4 h-4 text-green-500"></Check>
                </div> -->
                {:else if item.state==='PENDING'}
                <div class="absolute -top-1 -right-3">
                    <Timer class="w-4 h-4 text-red-600"></Timer>
                </div>
            {/if}
        </div>
    {:else if item.type === "send"}
        <div class="relative">
            <Banknote class="text-violet-600"></Banknote>
            <div class="absolute -top-1 -left-2">
                <ArrowUpRight class="w-4 h-4 text-red-600"
                ></ArrowUpRight>
            </div>
        </div>
    {:else if item.type === "receive"}
        <div class="relative">
            <Banknote class="text-violet-600"></Banknote>
            <div class="absolute -top-1 -left-2">
                <ArrowDownRight class="w-4 h-4 text-green-600"
                ></ArrowDownRight>
            </div>
        </div>
    {/if}
    <div class="flex flex-col gap-1 items-center">

        <span class="text-sm">
            {formatDistance($now, item.lastChangedAt)} ago
        </span>
        <span class="text-xs text-secondary overflow-clip text-ellipsis">
            {item.mintUrl}
        </span>
    </div>
    <div class="flex flex-col gap-1 items-end">
        <span>
            {formatAmount(item.amount, item.unit)}
        </span>
        {#if item.type==='send' || item.type==='receive' || item.type==='melt'}
        <span class="text-xs text-secondary">
            {formatAmount(item.fees ?? 0, item.unit)} fee
        </span>
        {/if}
    </div>
</a>