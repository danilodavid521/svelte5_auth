<script lang="ts">
	import UserAuthForm from './signup-form.svelte';
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<div class="bg-background flex w-full flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Signup</h1>
		</div>
		<UserAuthForm />
	</div>
</div>
