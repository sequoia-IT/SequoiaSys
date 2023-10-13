import { SCHOOL_ACADEMIC_YEAR, SCHOOL_TERM, USER_NAME, USER_SUBJECT } from '$lib/store';
import { redirect } from '@sveltejs/kit'

export const load = async ({ params, locals: { supabase, getSession } }) => {


    const session = await getSession();

    if (!session) {
        throw redirect(303, '/login');
    }
    let user_subject;
    USER_SUBJECT.subscribe(data => {
        user_subject = data;
    })
    let school_academic_year;
    SCHOOL_ACADEMIC_YEAR.subscribe(data => {
        school_academic_year = data;
    })
    let school_term;
    SCHOOL_TERM.subscribe(data => {
        school_term = data;
    })
    let user_name;
    USER_NAME.subscribe(data => {
        user_name = data;
    })


    let listofClasses = convertInputToArrays(params.classcode)

    let parsedlist = [];

    async function fetchStudents(classcode) {
        const { data: students } = await supabase
            .from('Student_Sessions')
            .select(
                `
        studentID,
        malay,
        Students(studentID, name)
        `
            )
            .ilike('class_code', classcode)
            .eq('class_term', school_term)
            .eq('academic_year', `${school_academic_year}`)
            .order('studentID', { ascending: true });

        return { classcode, students };
    }

    async function fetchDataForClasses() {
        for (const classcode of listofClasses) {
            const result = await fetchStudents(classcode);
            parsedlist.push(result);
        }

    }

    await fetchDataForClasses();

    const { data: classgroup } = await supabase
    .from('Teacher_Classes')
    .select(`group`)
    .eq('class_codes', params.classcode)
    .ilike('subject', user_subject)
    .ilike('teacher', user_name)
    .order('group', { ascending: true }).single()


    return { session, parsedlist,classgroup };

}



const convertInputToArrays = (inputText) => {
    // Split the input text by commas
    const inputArray = inputText.split(', ');

    // Initialize an output array
    const outputArray = [];

    // Iterate through the input elements
    for (const element of inputArray) {
        // Split each element by space
        const parts = element.split(' ');

        // If there are at least two parts, join them with a space and push to the output array
        if (parts.length >= 2) {
            outputArray.push(parts.join(' '));
        }
    }

    return outputArray;
};
