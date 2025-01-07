import type { ColumnDef } from '@tanstack/table-core';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
	id: string;
	email: string;
	bio: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'user_id',
		header: 'ID'
	},
	{
		accessorKey: 'bio',
		header: 'Bio'
	},
	{
		accessorKey: 'avatar_url',
		header: 'Avatar'
	}
];
