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

	let classcodes = convertInputToArrays($page.params.classcode);

	let divisions = filterDuplicates(data.divisions)
	
	function filterDuplicates(inputArray) {
  const seen = new Map();
  return inputArray.filter((item) => {
    const itemStr = JSON.stringify(item);
    if (seen.has(itemStr)) {
      return false;
    }
    seen.set(itemStr, true);
    return true;
  });
}

console.log(divisions)

	const displayStudents = async (classcode: string) => {
		const { data: user } = await supabase
			.from('Student_Sessions')
			.select(
				`
  studentID,${$USER_SUBJECT},
  Students(studentID,name )
  `
			)
			.ilike('class_code', classcode)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`)
			.order('studentID', { ascending: true });

		return user;
	};

	const updateStudentDivision = async (studentID, divisions, currentdivision) => {
		const { data: user } = await supabase
			.from('Student_Sessions')
			.update({ [$USER_SUBJECT]: currentdivision })
			.eq('studentID', studentID)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);
		// make toast  success and error
	};

	const undoupdateStudentDivision = async (studentID, divisions) => {
		const { data: user } = await supabase
			.from('Student_Sessions')
			.update({ [$USER_SUBJECT]: null })
			.eq('studentID', studentID)
			.eq('class_term', $SCHOOL_TERM)
			.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);
		// make toast  success and error
	};

	const checkanynullgroup = async (classcode) => {
		try {
			const { data: students } = await supabase
				.from('Student_Sessions')
				.select(
					`
					id,${$USER_SUBJECT}
      `
				)
				.ilike('class_code', classcode)
				.is($USER_SUBJECT, null)
				.eq('class_term', $SCHOOL_TERM)
				.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);

			if (students && students?.length > 0) {
				return { students, ischecked: false };
			} else {
				return { students: [], ischecked: true };
			}
		} catch (error) {
			throw error;
		}
	};

	const selectallstudentsinclass = async (students, classgroup) => {
		const { data: user } = await supabase.from('Student_Sessions').upsert(
			students.map((item) => ({
				...item,
				[$USER_SUBJECT]: item[$USER_SUBJECT] === null ? classgroup : item[$USER_SUBJECT]
			}))
		);
		window.location.reload();
		// make toast  success and error
	};

	const unselectallstudentsinclass = async (classcode, classgroup) => {
		try {
			const { data: students } = await supabase
				.from('Student_Sessions')
				.select(
					`
					id,${$USER_SUBJECT}
      `
				)
				.ilike('class_code', classcode)
				.eq($USER_SUBJECT, classgroup)
				.eq('class_term', $SCHOOL_TERM)
				.eq('academic_year', `${$SCHOOL_ACADEMIC_YEAR}`);

			if (students) {
				await supabase.from('Student_Sessions').upsert(
					students.map((item) => ({
						...item,
						[$USER_SUBJECT]: item[$USER_SUBJECT] === classgroup ? null : item[$USER_SUBJECT]
					}))
				);
				window.location.reload();
			}
		} catch (error) {
			throw error;
		}

		// make toast  success and error
	};
</script>

<h1>CLASS DIVISION</h1>
<!-- <button on:click={displayStudents}>CLICK ME</button> -->
<h1 class="text-3xl mb-10">SUBJECT {$USER_SUBJECT}</h1>

<div class="overflow-x-auto">
	<table class="table table-xs table-pin-rows table-pin-cols">
		<thead>
			<tr>
				<th>No</th>
				<td>StudentID</td>
				<td>Student Name</td>
				{#if divisions?.length === 0}
					<td>Entire Class</td>
				{:else if divisions}
					{#each divisions as code}
						<td
							>{code.group}
							<br />({code.teacher.toLocaleUpperCase()})</td
						>
					{/each}
				{/if}
				<th>Drop</th>
			</tr>
		</thead>
		<tbody>
			{#each classcodes as classcode}
				<tr class="bg-base-200">
					<th colspan="1" class="bg-base-200">Class</th>
					<th colspan="3" class="bg-base-200">{classcode}</th>
				</tr>
				{#await displayStudents(classcode)}
					<th>Loading</th>
				{:then studentsdata}
					{#each studentsdata as student, i}
						<tr>
							<th>{i + 1}</th>
							<td>{student.studentID}</td>
							<td>{student.Students.name}</td>
							{#if divisions?.length === 0}
								<td><input type="checkbox" checked={false} class="checkbox" /></td>
							{:else if divisions}
								{#each divisions as code}
									<td
										><input
											disabled={code.teacher.toLocaleLowerCase() !== $USER_NAME ||
												(student[$USER_SUBJECT] && student[$USER_SUBJECT] !== code.group)}
											type="checkbox"
											on:change={(event) => {
												if (event.target.checked) {
													updateStudentDivision(
														student.studentID,
														student[$USER_SUBJECT],
														code.group
													);
												} else {
													undoupdateStudentDivision(student.studentID, student[$USER_SUBJECT]);
												}
											}}
											checked={student[$USER_SUBJECT] === code.group}
											class="checkbox"
										/></td
									>
								{/each}
							{/if}
							<td
								><input
									type="checkbox"
									checked={!student[$USER_SUBJECT]}
									class="checkbox"
									disabled={!($USER_NAME === 'admin')}
								/></td
							>
						</tr>
					{/each}
				{/await}
				<tr>
					<td colspan="3" />
					{#each divisions as code}
						<td>
							{#if code.teacher.toLocaleLowerCase() === $USER_NAME}
								{#await checkanynullgroup(classcode)}
									<p>Loading...</p>
								{:then groupstudent}
									<div class="flex items-center">
										<input
											type="checkbox"
											class="checkbox"
											checked={groupstudent.ischecked}
											on:change={(event) => {
												if (event.target.checked) {
													selectallstudentsinclass(groupstudent.students, code.group);
												} else {
													unselectallstudentsinclass(classcode, code.group);
												}
											}}
										/>
										<span class="ml-2 align-middle">Select all</span>
									</div>
								{:catch error}
									<p>Error: {error.message}</p>
								{/await}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>No</th>
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
