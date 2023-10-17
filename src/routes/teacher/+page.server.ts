import { USER_NAME } from '$lib/store';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: user } = await supabase
		.from('Teachers')
		.select('name')
		.eq('email', session.user.email)
		.single();

	//TODO
	const { data: classes } = await supabase
		.from('Teacher_Classes')
		.select(`class_codes`)
		.ilike('teacher', user.name)
		.order('class_codes', { ascending: true });

	return { session, user, classes };
};
