<script>
    import * as Carousel from "$lib/components/ui/carousel";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { CheckCircle } from "lucide-svelte";
    import KeysList from "../wallet/keys/KeysList.svelte";
    import Address from "./Address.svelte";

    const pub = $keysStore.map((ks) => ks.publicKey)[$keysStore.length - 1];
</script>

<div class="h-full flex flex-col gap-2 w-80">
    <p class="font-bold text-lg">Address</p>
    <p class="flex gap-1">
        <span>
            Your nostr address is used to send and receive messages over
            nostr. It is linked to the first key with the checkmark below.
    </p>
    {#if $keysStore.length}
        <Address {pub}></Address>
    {/if}
</div>

<KeysList></KeysList>