<script lang="ts">
	import '$lib/styles/app.css';

	import { page } from '$app/state';
</script>

<main class="flex h-full min-h-[70vh] w-full items-center">
	<div class="flex w-full flex-col items-center justify-center text-4xl font-bold">
		<p class="">Error!</p>
		<p class="text-red-500">{page.error?.message}</p>
	</div>
</main>
