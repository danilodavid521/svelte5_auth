import { getAllUsers } from '$lib/server/db/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
	if (!user) {
		return {
			users: []
		};
	}

	return {
		users: await getAllUsers(supabase),
		user
	};
};
