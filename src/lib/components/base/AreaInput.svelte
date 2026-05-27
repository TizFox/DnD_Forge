<script lang="ts">
	import { Ellipsis } from "@lucide/svelte";

	type AreaInputPropsType = {
		wClass?: string;
		title?: string;
		value: string;
	};

	let {
		wClass = "w-full",
		title = "",
		value = $bindable(""),
	}: AreaInputPropsType = $props();

	let textArea: HTMLTextAreaElement;
	let startY = 0;
	let startHeight = 0;
	let resizing = $state(false);

	function onResizeStart(e: PointerEvent) {
		e.preventDefault();

		resizing = true;
		startY = e.clientY;
		startHeight = textArea.offsetHeight;

		textArea.style.height = `${startHeight}px`;

		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onResizeMove(e: PointerEvent) {
		if (!resizing) {
			return;
		}

		const delta = e.clientY - startY;
		const newHeight = startHeight + delta;

		textArea.style.height = `${newHeight}px`;
	}

	function onResizeEnd() {
		resizing = false;
	}
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col">
	{#if title !== ""}
		<h2 class="main-text">{title.toUpperCase()}</h2>
	{/if}
	<textarea bind:this={textArea} bind:value class="peer area-input">
	</textarea>
	<div
		class="resize {resizing ? 'bg-z1' : 'bg-z2'}"
		role="separator"
		aria-orientation="horizontal"
		onpointerdown={onResizeStart}
		onpointermove={onResizeMove}
		onpointerup={onResizeEnd}
		onpointercancel={onResizeEnd}
	>
		<Ellipsis />
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.area-input {
		scrollbar-gutter: stable;
		scrollbar-width: thin;
		scrollbar-color: var(--color-cta) transparent;

		@apply w-full p-std pr-0.5 bg-z2
		field-sizing-content resize-none
		text-left
		border-2 border-b rounded-t-lg
		transition-std border-dark focus:border-cta
		focus:outline-none focus:shadow-none;
	}

	.resize {
		@apply w-full h-15
		flex justify-center items-center
		border-2 border-t-0 rounded-b-lg
		transition-std border-dark peer-focus:border-cta
		hover:cursor-ns-resize
		select-none touch-none;
	}
</style>
