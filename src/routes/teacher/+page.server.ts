import { USER_NAME } from '$lib/store';
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {

  const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

  let user_name;
  const unsubscribe = USER_NAME.subscribe(data=>{
    user_name = data;
  })

  const { data: user } = await supabase
  .from('Teachers')
  .select('name')
  .eq('email', session.user.email)
  .single();

//TODO
  const { data: classes } = await supabase
  .from('Teacher_Classes')
  .select(`class_codes`)
  .eq('teacher', user_name)


return { session, user, classes };

}