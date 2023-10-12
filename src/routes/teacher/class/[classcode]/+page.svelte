<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import {
		SCHOOL_ACADEMIC_YEAR,
		SCHOOL_TERM,
		USER_EMAIL,
		USER_NAME,
		USER_SUBJECT
	} from '$lib/store';
	export let data: PageData;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let classcodes = convertInputToArrays($page.params.classcode);

	let divisions = data.divisions;

	function convertInputToArrays(inputText) {
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
	}

	const displayStudents = async (classcode: string) => {
		const { data: user } = await supabase
			.from('Student_Sessions')
			.select(
				`
  studentID,divisions,
  Students(studentID,name )
  `
			)
			.ilike('class_code', classcode)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`)
  .order('studentID', { ascending: true });
            
		return user;
	};

	function isCodeSelected(student, code) {
		if (student.divisions) {
			return student.divisions.some((division) => division[$USER_SUBJECT] === code);
		} else false;
	}

	function isNotCodeSelected(student, code) {
		if (student.divisions) {
			return student.divisions.some((division) => division[$USER_SUBJECT] !== code);
		} else false;
	}

	const updateStudentDivision = async (studentID, divisions, currentdivision) => {
		let newdivisions = [];

		if (!(divisions === null || (Array.isArray(divisions) && divisions.length === 0))) {
			// Check if the current subject exists in the divisions array
			let subjectExists = divisions.some((obj) => obj.hasOwnProperty($USER_SUBJECT));

			// If the current subject doesn't exist, add it to the divisions array
			if (!subjectExists) {
				let newObj = {};
				newObj[$USER_SUBJECT] = currentdivision;
				divisions.push(newObj);
			}
		} else {
			// If divisions is null, create a new array with the current subject and division
			let newObj = {};
			newObj[$USER_SUBJECT] = currentdivision;
			newdivisions.push(newObj);
		}
console.log(newdivisions)
console.log(divisions)
console.log(currentdivision)
		const { data: user } = await supabase
			.from('Student_Sessions')
			.update({ divisions: newdivisions })
			.eq('studentID', studentID)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);
	};

	const undoupdateStudentDivision = async (studentID, divisions) => {
		const { data: user } = await supabase
			.from('Student_Sessions')
			.update({ divisions: divisions })
			.eq('studentID', studentID)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);
	};

	const untickupdateStudentDivision = async (studentID, divisions) => {
		let newdivisions = divisions.filter((item) => !item.hasOwnProperty($USER_SUBJECT));
		const { data: user } = await supabase
			.from('Student_Sessions')
			.update({ divisions: newdivisions })
			.eq('studentID', studentID)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);
	};
</script>

<h1>CLASS DIVISION</h1>
<!-- <button on:click={displayStudents}>CLICK ME</button> -->
<h1 class="text-3xl mb-10">SUBJECT {$USER_SUBJECT}</h1>

<div class="overflow-x-auto">
	<table class="table table-xs table-pin-rows table-pin-cols">
		<thead>
			<tr>
				<th />
				<td>StudentID</td>
				<td>Student Name</td>
				{#if divisions?.length === 0}
					<td>Entire Class</td>
				{:else if divisions}
					{#each divisions as code}
						<td
							>{code.group}
							<br />({code.teacher})</td
						>
					{/each}
				{/if}
				<th>Drop</th>
			</tr>
		</thead>
		<tbody>
			{#each classcodes as classcode}
				<tr>
					<th colspan="3">{classcode}</th>
				</tr>
				{#await displayStudents(classcode)}
					<th>Loading</th>
				{:then studentsdata}
					{#each studentsdata as student}
						<tr>
							<th>1</th>
							<td>{student.studentID}</td>
							<td>{student.Students.name}</td>
							{#if divisions?.length === 0}
								<td><input type="checkbox" checked={false} class="checkbox" /></td>
							{:else if divisions}
								{#each divisions as code}
									<td
										><input
											disabled={code.teacher !== $USER_NAME ||
												isNotCodeSelected(student, code.group)}
											type="checkbox"
											on:change={(event) => {
												if (event.target.checked) {
													updateStudentDivision(student.studentID, student.divisions, code.group);
												} else {
													if (isCodeSelected(student, code.group)) {
														untickupdateStudentDivision(student.studentID, student.divisions);
													} else {
														undoupdateStudentDivision(student.studentID, student.divisions);
													}
												}
											}}
											checked={isCodeSelected(student, code.group)}
											class="checkbox"
										/></td
									>
								{/each}
							{/if}
							<td><input type="checkbox" checked={false} class="checkbox" disabled /></td>
						</tr>
					{/each}
				{/await}
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th />
				<td>StudentID</td>
				<td>Student Name</td>
				{#if divisions?.length === 0}
					<td>Entire Class</td>
				{:else if divisions}
					{#each divisions as code}
						<td>{code.group}</td>
					{/each}
				{/if}
				<th>Drop</th>
			</tr>
		</tfoot>
	</table>
</div>
