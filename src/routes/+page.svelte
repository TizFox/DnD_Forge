<script lang="ts">
	import logo from "$lib/assets/logo1000.png";
	import { NAME, PATH } from "$lib/global.svelte";

	import TextInput from "$lib/baseComponents/TextInput.svelte";

	let user = $state("");
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>Login - {NAME}</title>
</svelte:head>

<!------------------------------------------>

<div class="flex">
	<h3 class="main-text">USER:</h3>
	<TextInput value={user} onChange={(s: string) => (user = s)} />
	<a href="{PATH}/{user}" class="std-btn">CONFIRM</a>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
