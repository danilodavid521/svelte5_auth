<script lang="ts">
	import { enhance } from '$app/forms';
	import PhotoUploader from '$lib/components/PhotoUploader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Loader2 } from 'lucide-svelte';

	const { data, form = {} } = $props();

	let loading = $state(false);
	let error: string | null = $state(null);

	function handleSubmit() {
		loading = true;
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				error = result.data?.error;
			} else if (result.type === 'success') {
				error = null;
			}
			await update({ reset: false });
			loading = false;
		};
	}
</script>

<main class="mx-auto flex w-full max-w-7xl flex-col">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Edit profile data</h2>
			<p class="text-muted-foreground">Profile details</p>
			<p class="text-muted-foreground">{data.profile.user_id}</p>
		</div>
	</div>

	<div class="container mx-auto px-4 py-8">
		<div class="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
			<h1 class="mb-8 text-3xl font-bold">Edit Profile</h1>
			<form
				method="POST"
				action="?/updateProfile"
				enctype="multipart/form-data"
				use:enhance={handleSubmit}
				class="space-y-6"
			>
				<input type="hidden" name="user_id" bind:value={data.profile.id} />

				<PhotoUploader />

				<div>
					<Label for="bio">Bio</Label>
					<textarea
						id="bio"
						name="bio"
						rows="4"
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={data.profile?.bio || ''}
					></textarea>
				</div>

				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					{'Update'}
				</Button>
			</form>
		</div>
	</div>
</main>
