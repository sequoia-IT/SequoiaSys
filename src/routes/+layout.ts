// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../database.types';
import { USER_EMAIL, USER_NAME, USER_SUBJECT } from '$lib/store';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
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
			USER_SUBJECT.set(teacher.subject);
			USER_NAME.set(teacher.name);
		} else {
			USER_SUBJECT.set('NO_SUBJECT_FOUND'.toLocaleLowerCase());
			USER_NAME.set('NO_USER_FOUND');
		}
	}

	USER_EMAIL.set(session?.user.email);

	return { supabase, session };
};
