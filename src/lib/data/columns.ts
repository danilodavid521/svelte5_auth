import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import Avatar from '$lib/components/Avatar.svelte';
import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
	id: string;
	email: string;
	bio: string;
	avatar_url: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'user_id',
		header: 'No',
		cell: ({ row }) => {
			return row.index + 1;
		}
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'bio',
		header: 'Bio'
	},
	{
		accessorKey: 'avatar_url',
		header: 'Avatar',
		cell: ({ row }) => {
			if (row.original.avatar_url) {
				const previewUrl =
					PUBLIC_SUPABASE_URL + '/storage/v1/object/public/avatars/' + row.original.avatar_url;
				return renderComponent(Avatar, { previewUrl });
			}
			return '';
		}
	},
	{
		accessorKey: 'updated_at',
		header: 'Joined'
	}
];
