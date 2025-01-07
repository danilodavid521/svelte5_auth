<script lang="ts">
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from '$lib/data/columns';

	const { data } = $props();
	$inspect(data.users);
</script>

<svelte:head>
	<title>User management</title>
</svelte:head>

<main class="mx-auto flex w-full max-w-7xl flex-col">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Users</h2>
			<p class="text-muted-foreground">Here's a list of users in the system!</p>
		</div>
	</div>
	<DataTable data={data.users} {columns} onRowClick={(id: string) => goto(`/${id}/`)} />
</main>
