<script lang="ts">
	import type { LayoutProps } from "./$types";

	import logo from "$lib/assets/logo1000.png";

	let { children }: LayoutProps = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=1280" />
	<link rel="icon" href={logo} />
</svelte:head>

<!------------------------------------------>

{@render children()}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
