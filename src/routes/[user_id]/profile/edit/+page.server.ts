import { getUser, updateUser } from '$lib/server/db/users';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (!params.user_id) throw fail(404, { message: 'No user found' });

	return {
		profile: await getUser(supabase, params.user_id),
		user
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals: { supabase, user } }) => {
		if (!user) {
			throw error(403, 'Unauthorized');
		}

		const formData = await request.formData();
		const bio = formData.get('bio') as string;
		const user_id = formData.get('user_id') as string;
		const avatar = formData.get('avatar') as File;

		const avatar_url = 'avatar';
		if (avatar.size > 0) {
			// const { data: uploadData, error: uploadError } = await supabase.storage
			// 	.from('avatars')
			// 	.upload(`${user.id}/${Date.now()}`, avatar);
			// if (uploadError) throw uploadError;
			// avatar_url = uploadData.path;
		}

		await updateUser(supabase, user_id, {
			bio,
			avatar_url
		});

		throw redirect(302, '/');
	}
};
