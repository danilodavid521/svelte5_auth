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
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match',
				email
			});
		}

		const { error: signupError, data: signupData } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (signupError) {
			return fail(400, { error: signupError.message, email });
		}

		// Create profile after successful registration
		const { error: profileError } = await supabase
			.from('profiles')
			.insert([{ id: crypto.randomUUID(), user_id: signupData.user!.id, email }]);

		if (profileError) throw profileError;

		return { success: true, email };
	}
};
