import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {

  const { data: teachers, error } = await supabase
  .from('Teachers')
  .select('email')
  .eq('isregistered', 'FALSE')
  
  return { teachers, error }
}