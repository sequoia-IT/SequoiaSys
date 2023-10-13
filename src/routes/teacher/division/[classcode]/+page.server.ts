import { SCHOOL_ACADEMIC_YEAR, USER_SUBJECT } from '$lib/store';
import { redirect } from '@sveltejs/kit'
import { onDestroy } from 'svelte';

export const load = async ({ params, locals: { supabase, getSession } }) => {


  const session = await getSession();

  if (!session) {
    throw redirect(303, '/login');
  }
  let user_subject;
  const unsubscribe = USER_SUBJECT.subscribe(data => {
    user_subject = data;
  })

  const { data: divisions } = await supabase
    .from('Teacher_Classes')
    .select(`group,teacher`)
    .eq('class_codes', params.classcode)
    .ilike('subject', user_subject)
    .order('group', { ascending: true })

  // onDestroy(unsubscribe)

  return { session, divisions };

}


