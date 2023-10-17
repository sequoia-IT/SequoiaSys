import { SCHOOL_ACADEMIC_YEAR, USER_SUBJECT, USER_NAME } from '$lib/store';
import { redirect } from '@sveltejs/kit';
import { onDestroy } from 'svelte';

export const load = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}
	let user_subject;
	USER_SUBJECT.subscribe((data) => {
		user_subject = data;
	});
	let user_name;
	USER_NAME.subscribe((data) => {
		user_name = data;
	});
	let divisions;
	// filter the edge case class of H1 H2
	if (params.classcode === 'Y9 H1, Y9 H2') {
		const { data } = await supabase
			.from('Teacher_Classes')
			.select(`group,teacher`)
			.ilike('class_codes', params.classcode)
			.in('subject', ['cs', 'bio'])
			.order('group', { ascending: true });
		divisions = data;
	} else if (user_subject === 'bio' || user_subject === 'econ') {
		let classcodes = convertInputToArrays(params.classcode);
		const { data } = await supabase
			.from('Teacher_Classes')
			.select(`group,teacher`)
			.ilike('class_codes', `%${convertToPattern(classcodes)}`)
			.in('subject', ['Bio', 'Econ'])
			.order('group', { ascending: true });
		divisions = data;
	} else if (user_subject === 'cs' || user_subject === 'bs') {
		let classcodes = convertInputToArrays(params.classcode);
		const { data } = await supabase
			.from('Teacher_Classes')
			.select(`group,teacher`)
			.ilike('class_codes', `%${convertToPattern(classcodes)}`)
			.in('subject', ['CS', 'BS'])
			.order('group', { ascending: true });
		divisions = data;
	} else if (user_subject === 'history' || user_subject === 'acct') {
		let classcodes = convertInputToArrays(params.classcode);
		const { data } = await supabase
			.from('Teacher_Classes')
			.select(`group,teacher`)
			.ilike('class_codes', `%${convertToPattern(classcodes)}`)
			.in('subject', ['History', 'Acct'])
			.order('group', { ascending: true });
		divisions = data;
	} else {
		const { data } = await supabase
			.from('Teacher_Classes')
			.select(`group,teacher`)
			.eq('class_codes', params.classcode)
			.ilike('subject', user_subject)
			.order('group', { ascending: true });
		divisions = data;
	}

	// onDestroy(unsubscribe)

	return { session, divisions };
};

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

function convertToPattern(classcodes) {
	if (classcodes.length === 0) {
		return '';
	}

	const parts = classcodes[0].split(' ');
	const commonPrefix = parts[0];
	const commonSuffix = parts[1];

	const pattern = commonPrefix + ' ' + commonSuffix.replace(/\d/g, '%');
	return pattern;
}
