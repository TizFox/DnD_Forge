<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import logo from "$lib/assets/logo1000.png";
	import { NAME } from "$lib/global.svelte";

	import Header from "$lib/components/Header.svelte";
	import Main from "$lib/components/Main.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import Empty from "$lib/components/Empty.svelte";
</script>

<!------------------------------------------>

<svelte:head>
	<meta name="viewport" content="width=1280" />
	<link rel="icon" href={logo} />
	<title>Error 404 - {NAME}</title>
</svelte:head>

<!------------------------------------------>

<Header />

<Main>
	<Empty msg={m.empty_invalid_url()} />
</Main>

<Footer />

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
