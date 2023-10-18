// src/routes/+layout.ts
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../database.types';
import { USER_EMAIL, USER_NAME, USER_SUBJECT } from '$lib/store';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: 'https://ggenzdikqncwnlmrbvmr.supabase.co',
		supabaseKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZW56ZGlrcW5jd25sbXJidm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzAzNjksImV4cCI6MjAxMjQwNjM2OX0.su2ngHvoXAeQ-iuXtPThSjXURqB70pKjRoczowiMYvg',
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session?.user.email) {
		const { data: teacher } = await supabase
			.from('Teachers')
			.select(`name,subject`)
			.eq('email', session?.user.email)
			.single();
		if (teacher) {
			USER_SUBJECT.set(teacher.subject.toLocaleLowerCase());
			USER_NAME.set(teacher.name.toLocaleLowerCase());
		} else {
			USER_SUBJECT.set('NO_SUBJECT_FOUND'.toLocaleLowerCase());
			USER_NAME.set('NO_USER_FOUND');
		}
	}

	USER_EMAIL.set(session?.user.email);

	return { supabase, session };
};
