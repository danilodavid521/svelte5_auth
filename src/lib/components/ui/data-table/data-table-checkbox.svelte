<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		checked = false,
		controlledChecked = true,
		...restProps
	}: ComponentProps<typeof Checkbox> = $props();
</script>

<Checkbox {checked} {controlledChecked} {...restProps} />
