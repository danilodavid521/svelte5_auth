<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Upload } from 'lucide-svelte';

	interface Props {
		avatarUrl?: string | null;
	}

	let { avatarUrl = null }: Props = $props();

	let fileInput: HTMLInputElement;
	let previewUrl: string | null = $state(avatarUrl);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onloadend = () => {
					previewUrl = reader.result as string;
				};
				reader.readAsDataURL(file);
			} else {
				alert('Please select a valid image file.');
			}
		}
	}

	function triggerFileInput() {
		fileInput.click();
	}
</script>

<div class="flex flex-col items-center space-y-4">
	<div
		class="group relative h-32 w-32 cursor-pointer"
		onclick={triggerFileInput}
		onkeydown={(e) => e.key === 'Enter' && triggerFileInput()}
		role="button"
		tabindex="0"
	>
		{#if previewUrl}
			<img src={previewUrl} alt="Profile" class="h-full w-full rounded-full object-cover" />
		{/if}

		{#if !previewUrl}
			<div
				class="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity"
			>
				<Upload class="h-8 w-8 text-white" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col items-center space-y-2">
		<Label for="picture" class="text-sm font-medium">Profile Picture</Label>
		<input
			bind:this={fileInput}
			id="avatar"
			name="avatar"
			type="file"
			accept="image/*"
			class="hidden"
			onchange={handleFileSelect}
		/>
		<Button type="button" variant="outline" onclick={triggerFileInput} class="text-sm">
			Choose Image
		</Button>
	</div>
</div>
