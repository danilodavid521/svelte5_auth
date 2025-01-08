import { getUser } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (!params.profile_id) error(404, { message: 'No user found' });

	return {
		profile: await getUser(supabase, params.profile_id),
		user
	};
};
