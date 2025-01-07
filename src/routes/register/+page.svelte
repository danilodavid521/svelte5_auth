<script lang="ts">
	import UserAuthForm from './signup-form.svelte';
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<div class="bg-background flex w-full flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-lg">
		<UserAuthForm />
	</div>
</div>
