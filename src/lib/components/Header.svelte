<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	import { locales, getLocale, setLocale, type Locale} from "$lib/paraglide/runtime";

	import logo from "$lib/assets/logo1000.png";
	import { getPath, lockInput } from "$lib/global.svelte";

	let { children = undefined }: { children?: Snippet<[]> } = $props();

	onMount(() => {
		document.documentElement.lang = getLocale();
	})

	const localeLocalization: Record<Locale, string> = {
		'it': "Italiano",
		'en': "English",
	};

	let currentLang = $state<Locale>(getLocale());

	function updateLang(e: Event) {
		setLocale((e.target as HTMLSelectElement).value as Locale);
	}
</script>

<!------------------------------------------>

<header class="bar-container">
	<div class="bar">
		<a href={getPath()} class="h-full">
			<img src={logo} alt="Logo" class="h-full" />
		</a>

		<select
			value={currentLang}
			onchange={updateLang}
			disabled={lockInput()}
			class="language-select"
		>
			{#each locales as lang}
				<option value={lang}>{localeLocalization[lang]}</option>
			{/each}
		</select>

		<div class="user-actions">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</header>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.user-actions {
		@apply w-full h-full
		flex items-center justify-end gap-5;
	}

	.language-select {
		@apply flex-1 h-8 px-1 bg-z2 text-left
		base-border rounded-lg
		base-transition focus:border-cta
		focus:outline-none
		focus:shadow-none
		disabled:border-z0;
	}
</style>
