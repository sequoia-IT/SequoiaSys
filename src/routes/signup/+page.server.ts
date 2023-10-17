import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (session) {
		throw redirect(303, '/teacher');
	}

	const { data: teachers, error } = await supabase
		.from('Teachers')
		.select('email')
		.eq('isregistered', 'FALSE');

	return { teachers, error };
};
