<script>
    import Label from "$lib/components/ui/label/label.svelte";
    import DarkModeSetting from "./DarkModeSetting.svelte";
    import HideBalanceSetting from "./settingsElements/HideBalanceSetting.svelte";
</script>

<div class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
        <p class="font-bold">Theme</p>
        <div class="flex justify-between items-center">
            <Label>Dark mode</Label>
            <DarkModeSetting></DarkModeSetting>
        </div>
    </div>
    <div class="flex flex-col gap-1">
        <p class="font-bold">Display</p>
        <div class="flex justify-between items-center">
            <HideBalanceSetting></HideBalanceSetting>
        </div>
    </div>
    
</div>
