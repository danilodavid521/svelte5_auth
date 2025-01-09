import { getUser } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (!params.profile_id) error(404, { message: 'No user found' });

	let avatar_url = '';
	const profileData = await getUser(supabase, params.profile_id);

	if (profileData.avatar_url) {
		const {
			data: { publicUrl }
		} = await supabase.storage.from('avatars').getPublicUrl(profileData.avatar_url);
		avatar_url = publicUrl;
	}

	return {
		profile: await getUser(supabase, params.profile_id),
		user,
		avatar_url
	};
};
