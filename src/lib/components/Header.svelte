<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from './ui/button';

	const { session } = $props();
</script>

<header class="mx-auto flex w-full justify-center bg-slate-100 py-3">
	<div class="mx-auto flex w-full max-w-6xl flex-row items-center justify-end gap-3">
		{#if session}
			<form action="/logout?/logout" method="POST">
				<button type="submit" class="hover:underline">Logout</button>
			</form>
		{:else}
			<a
				class:underline={page.url.pathname == '/login'}
				class="hover:underline {buttonVariants({ variant: 'default' })} "
				href="/login"
			>
				Login
			</a>
			<a
				class:underline={page.url.pathname == '/register'}
				class="hover:underline {buttonVariants({ variant: 'outline' })}"
				href="/register"
			>
				Register
			</a>
		{/if}
	</div>
</header>
