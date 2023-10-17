import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: academic_years } = await supabase
		.from('School_Semester')
		.select('academic_year,term')
		.eq('isActive', 'TRUE')
		.single();

	return { academic_years };
};
