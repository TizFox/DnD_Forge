<script lang="ts">
	import * as m from "$lib/paraglide/messages";

	import logo from "$lib/assets/logo1000.png";
	import { NAME } from "$lib/global.svelte";
</script>

<!------------------------------------------>

<footer class="bar-container">
	<div class="bar">
		<img src={logo} alt="Logo" class="h-full" />
		<div>
			<h1 class="main-text">{NAME}</h1>
			<p>
				{m.footer_by()} <a
					target="_blank"
					href="https://github.com/TizFox"
					class="link"
				>
					TizFox
				</a>
			</p>
		</div>
	</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
