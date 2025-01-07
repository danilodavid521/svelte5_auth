import { getUser } from '$lib/server/db/users';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (!params.user_id) throw fail(404, { message: 'No user found' });

	return {
		profile: await getUser(supabase, params.user_id),
		user
	};
};
