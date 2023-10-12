import { writable } from 'svelte/store';


export const USER_EMAIL = writable()
export const USER_SUBJECT = writable()
export const USER_NAME = writable()
export const SCHOOL_TERM = writable(1)
export const SCHOOL_ACADEMIC_YEAR = writable("2023/24")



