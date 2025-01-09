import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(302, '/');
	}
};

export const load = async () => {
	redirect(303, '/login');
};
