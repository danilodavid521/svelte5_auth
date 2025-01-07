<script lang="ts">
	const { data } = $props();
</script>

<main class="mx-auto flex w-full max-w-7xl flex-col">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Users profile</h2>
			<p class="text-muted-foreground">Profile details</p>
		</div>
		{#if data.user && data.user.id == data.profile.user_id}
			<a href={'profile/edit'}> Edit profile </a>
		{/if}
	</div>
	<div class="mt-5">
		{data.user?.id}
	</div>
</main>
