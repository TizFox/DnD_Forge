<script lang="ts">
	import { Trash } from "@lucide/svelte";

	import type { Character } from "$lib/character.svelte";

	import Container from "$lib/components/base/Container.svelte";
	import Value from "$lib/components/base/Value.svelte";

	let {
		data,
		openFun,
		removeFun,
	}: {
		data: { id: string; character: Character };
		openFun: (id: string) => void;
		removeFun: (id: string) => void;
	} = $props();
</script>

<!------------------------------------------>

<div class="w-full h-full flex justify-between">
	<button onclick={() => openFun(data.id)} class="flex-1">
		<Container
			extraClasses="
				w-full
				flex justify-start items-center gap-3
				rounded-r-none border-2 transition-std border-dark hover:border-cta
			"
		>
			<Value wClass="w-fit" value={data.character.info.level} />
			<p class="flex-1 h-min text-left">
				{data.character.info.name}
			</p>
			<p class="flex-1 h-min text-left">
				{data.character.info.campaign}
			</p>
		</Container>
	</button>
	<button onclick={() => removeFun(data.id)} class="std-btn rounded-l-none">
		<Trash />
	</button>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
