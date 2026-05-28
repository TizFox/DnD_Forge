<script lang="ts">
	import { Download, Trash } from "@lucide/svelte";

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

<div
	class="w-full h-full flex justify-between"
	style="--hover-color: {data.character.info.color}"
>
	<button onclick={() => openFun(data.id)} class="flex-1">
		<Container
			extraClasses="
				group w-full
				flex justify-start items-center gap-3
				rounded-r-none base-border
				base-transition hover:border-(--hover-color)
			"
		>
			<Value
				wClass="w-fit group-hover:text-(--hover-color)"
				value={data.character.info.level}
			/>
			<p
				class="flex-1 h-min text-left
				group-hover:text-(--hover-color)"
			>
				{data.character.info.name}
			</p>
			<p
				class="flex-1 h-min text-left
				group-hover:text-(--hover-color)"
			>
				{data.character.info.campaign}
			</p>
		</Container>
	</button>
	<button
		onclick={() => {}}
		class="base-button rounded-none
			hover:bg-(--hover-color)
			hover:border-(--hover-color)
		"
	>
		<Download />
	</button>
	<button
		onclick={() => removeFun(data.id)}
		class="base-button rounded-l-none
			hover:bg-(--hover-color)
			hover:border-(--hover-color)
		"
	>
		<Trash />
	</button>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
