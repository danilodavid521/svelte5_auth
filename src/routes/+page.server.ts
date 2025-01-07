import { getAllUsers } from '$lib/server/db/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
	const users = await supabase.from('profiles').select();
	console.log(users);
	return {
		users: await getAllUsers(supabase, user?.id as string),
		user
	};
};
