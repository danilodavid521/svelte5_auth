<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>User profile</title>
</svelte:head>

<main class="mx-auto flex w-full max-w-5xl flex-col">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Users profile</h2>
			<p class="text-muted-foreground">Profile details</p>
		</div>
		<div class="flex flex-row gap-3">
			<a href={'/'} class="font-semibold hover:underline {buttonVariants({ variant: 'outline' })}">
				Back
			</a>

			{#if data.user && data.user.id == data.profile.user_id}
				<a
					href={'profile/edit'}
					class="font-semibold hover:underline {buttonVariants({ variant: 'secondary' })}"
				>
					Edit profile
				</a>
			{/if}
		</div>
	</div>
	<div class="mt-5 flex flex-col gap-3">
		{#if data.avatar_url}
			<img src={data.avatar_url} alt="avatar" class="h-32 w-32 rounded-full object-cover" />
		{/if}
		<p class="text-lg">
			<!-- {data.profile.user_id} -->
		</p>
		<p>
			{data.profile?.bio}
		</p>
	</div>
</main>
