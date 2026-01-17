<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "$lib/assets/style.scss";

	let { children } = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
	<title>⏰💤 Wakie-time</title>
</svelte:head>

<div class="app">
	{@render children()}
</div>
