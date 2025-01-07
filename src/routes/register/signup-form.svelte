<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Loader2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	interface Props {
		form?: { email?: string; password?: string; error?: string };
	}

	let { form = {} }: Props = $props();

	let loading = $state(false);
	let email = $state(form.email || '');
	let password = $state(form.password || '');

	let error: string | null = $state(null);

	function handleSubmit() {
		loading = true;
		return async ({ result, update }) => {
			console.log(result);
			if (result.type === 'failure') {
				error = result.data?.error;
				email = result.data?.email || email;
			} else if (result.type === 'success') {
			}
			await update({ reset: false });
			loading = false;
		};
	}
</script>

<form method="POST" use:enhance={handleSubmit} class="space-y-4">
	<!-- <div class="space-y-2">
		<Label for="email">Email</Label>
		<Input
			id="email"
			name="email"
			type="email"
			placeholder="name@example.com"
			required
			bind:value={email}
			disabled={loading}
		/>
	</div>

	<div class="space-y-2">
		<Label for="password">Password</Label>
		<Input
			id="password"
			name="password"
			type="password"
			required
			bind:value={password}
			disabled={loading}
		/>
	</div>
	<div class="flex space-y-2">
		<Label for="confirmPassword">Confirm Password</Label>
		<Input
			id="confirmPassword"
			name="confirmPassword"
			type="password"
			required
			disabled={loading}
		/>
	</div> -->

	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title class="text-2xl">Signup</Card.Title>
			<Card.Description>Enter your email below to create your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					name="email"
					disabled={loading}
					placeholder="m@example.com"
					required
				/>
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" name="password" type="password" disabled={loading} required />
			</div>
			<div class="grid gap-2">
				<Label for="confirmPassword">Confirm Password</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					disabled={loading}
					required
				/>
			</div>
			{#if error}
				<p class="text-sm text-red-500">{error}</p>
			{/if}
		</Card.Content>
		<Card.Footer>
			<Button type="submit" class="w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Signup
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
