<script lang="ts">
	import UserAuthForm from './login-form-password.svelte';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center bg-background">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Login</h1>
			<p class="text-sm text-muted-foreground">Enter your email to login</p>
		</div>
		<UserAuthForm />
	</div>
</div>