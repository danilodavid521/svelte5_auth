import { getAllUsers } from '$lib/server/db/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
	return {
		users: await getAllUsers(supabase, user?.id as string),
		user
	};
};
