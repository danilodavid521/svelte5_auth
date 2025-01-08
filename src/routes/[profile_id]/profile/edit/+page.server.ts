import { getUser, updateUser } from '$lib/server/db/users';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (!params.profile_id) error(404, { message: 'No user found' });
	if (!user?.id) error(403, { message: 'Unauthorized' });

	let avatar_url = '';
	const profileData = await getUser(supabase, params.profile_id);

	if (profileData.user_id !== user.id) error(403, { message: 'Unauthorized' });

	if (profileData.avatar_url) {
		const {
			data: { publicUrl }
		} = await supabase.storage.from('avatars').getPublicUrl(profileData.avatar_url);
		avatar_url = publicUrl;
	}

	return {
		profile: { ...profileData, avatar_url },
		user
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals: { supabase, user } }) => {
		if (!user) {
			error(403, 'Unauthorized');
		}

		const formData = await request.formData();
		const bio = formData.get('bio') as string;
		const user_id = formData.get('user_id') as string;
		const avatar = formData.get('avatar') as File;

		let avatar_url = '';
		if (avatar.size > 0) {
			// Use consistent filename based on user_id
			const fileExt = avatar.name.split('.').pop();
			const fileName = `${user_id}/${user_id}.${fileExt}`;

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(fileName, avatar, {
					upsert: true
				});

			if (uploadError) throw uploadError;
			avatar_url = uploadData.path;
		}

		const updateData: { [key: string]: string } = { bio };

		if (avatar_url !== '') {
			updateData.avatar_url = avatar_url;
		}
		await updateUser(supabase, user_id, updateData);

		throw redirect(302, '/');
	}
};
