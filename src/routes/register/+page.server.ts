import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (password !== confirmPassword) {
      return fail(400, {
        error: 'Passwords do not match',
        email,
				username
      });
    }

		const { error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (error) {
			return fail(400, { error: error.message, email });
		}

		return { success: true, email };
	}
};
