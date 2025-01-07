<script lang="ts">
	import { page } from '$app/state';

	const { session } = $props();
</script>

<header class="mx-auto flex w-full max-w-7xl justify-end py-3">
	<div class="flex flex-row items-center gap-3">
		{#if session}
			<a class="hover:underline" href="/logout"> Logout </a>
		{:else}
			<a class:underline={page.url.pathname == '/login'} class="hover:underline" href="/login">
				Login
			</a>
			<a
				class:underline={page.url.pathname == '/register'}
				class="hover:underline"
				href="/register"
			>
				Register
			</a>
		{/if}
	</div>
</header>
