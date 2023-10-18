<script lang="ts">
	import Select from 'svelte-select';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	let academic_years = data.academic_years;

	let academic_year = academic_years?.academic_year;
	let term = academic_years?.term;
	let subject;
	let teacher;
	let teachers = [];
	let classgroup;
	let classgroups = [];
	$: teacher_group = [
		{
			teacher: '',
			classgroup: '',
			classgroups: []
		}
	];
	let p_array = [{ name: 'Knowledge', weight: 20, fullmark: 60 }];
	let name = '';
	let weight = 0;
	let fullmark = '';

	// Function to add a new item to the array
	function addNewItem() {
		if (p_array.length < 5) {
			p_array = [...p_array, { name: '', weight: 0, fullmark: 0 }];
		}
	}

	const fetchSubjects = async () => {
		const { data } = await supabase
			.from('Subjects')
			.select('Abbreviation,Name')
			.eq('hasExam', 'TRUE');
		return transformArrayforSubjects(data);
	};

	const fetchTeacher = async () => {
		if (subject) {
			const { data } = await supabase
				.from('Teacher_Classes')
				.select('teacher')
				.ilike('subject', subject)
				.eq('academic_year', academic_year)
				.eq('class_term', term);

			teachers = transformArrayforDivisions(data);
		}
	};

	const fetchClassgroup = async (teacher, index) => {
		if (teacher) {
			const { data } = await supabase
				.from('Teacher_Classes')
				.select('id,class_codes,group')
				.ilike('teacher', teacher)
				.eq('academic_year', academic_year)
				.eq('class_term', term);
			teacher_group[index].classgroups = transformArrayforClassGroups(data);
		}
	};

	const handleAddTeachGroup = () => {
		teacher_group = [
			...teacher_group,
			{
				teacher: '',
				classgroup: '',
				classgroups: []
			}
		];
	};

	const handleCreateExam = async () => {
		console.log(teacher_group, p_array);

		teacher_group.forEach(async (teachitem) => {});

		const { data: teacherClasses, error } = await supabaseClient
			.from('Teacher_Classes')
			.select('id')
			.eq('teacher', teacher)
			.eq('class_code', classCode)
			.eq('subject', subject)
			.eq('group', group)
			.single();
	};

	function transformArrayforSubjects(arr) {
		// Create a new array to store the transformed objects
		const transformedArray = [];

		// Iterate through the original array
		for (const item of arr) {
			// Create a new object with "value" and "label" keys
			const transformedItem = {
				value: item.Abbreviation,
				label: item.Name
			};

			// Push the transformed object to the new array
			transformedArray.push(transformedItem);
		}

		return transformedArray;
	}

	function transformArrayforClassGroups(arr) {
		// Create a new array to store the transformed objects
		const transformedArray = [];

		// Iterate through the original array
		for (const item of arr) {
			// Create a new object with "value" and "label" keys
			const transformedItem = {
				value: item.class_codes,
				label: item.class_codes,
				group: item.group
			};

			// Push the transformed object to the new array
			transformedArray.push(transformedItem);
		}

		return transformedArray;
	}

	function transformArrayforDivisions(arr) {
		const uniqueGroups = {};
		const transformedArray = [];

		for (const item of arr) {
			const teacher = item.teacher;

			if (!uniqueGroups[teacher]) {
				uniqueGroups[teacher] = true;
				const transformedItem = {
					value: teacher,
					label: teacher
				};
				transformedArray.push(transformedItem);
			}
		}

		return transformedArray;
	}

	function hasDuplicates(array) {
		const seen = {};

		for (let i = 0; i < array.length; i++) {
			const item = array[i];
			const key = `${item.teacher}-${item.classgroup.value}`;

			if (item.classgroups.length === 0) {
				continue; // Skip items with an empty "classgroups" array
			}

			if (seen[key]) {
				return true; // If the item has been seen before, it's a duplicate
			}
			seen[key] = true;
		}

		return false; // No duplicates were found
	}

	if (browser) {
		window.addEventListener('beforeunload', (event) => {
			event.preventDefault();
			event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
		});
	}
</script>

<h1 class="text-3xl font-bold">Create Exam</h1>

<div>
	<div class="form-control w-full pt-3">
		<h1 class="font-bold">Select Academic Term</h1>
		<div class="flex w-full">
			<div class="grid flex-grow card rounded-box">
				<div>
					<div class="label">
						<span class="label-text">Academic Year</span>
					</div>
					<input
						type="text"
						disabled
						bind:value={academic_year}
						placeholder="Type here"
						class="input input-bordered w-full"
					/>
				</div>
			</div>
			<div class="divider divider-horizontal" />
			<div class="grid flex-grow card rounded-box">
				<div>
					<div class="label">
						<span class="label-text">Term</span>
					</div>
					<input
						type="text"
						disabled
						bind:value={term}
						placeholder="Type here"
						class="input input-bordered w-full"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="form-control w-full pt-3">
		<h1 class="font-bold">Select Exam Subject</h1>
		<div class="flex w-full">
			<div class="grid flex-grow card rounded-box">
				<div>
					<div class="label">
						<span class="label-text">Subject</span>
					</div>
					<Select
						placeholder="Select Exam Subject"
						clearable={true}
						bind:justValue={subject}
						class="input input-bordered w-full"
						loadOptions={fetchSubjects}
						on:change={() => {
							fetchTeacher();
						}}
					/>
				</div>
			</div>
		</div>
	</div>

	<div>
		<div class="form-control w-full pt-3">
			<h1 class="font-bold text-2xl">Select Teacher Class Group</h1>

			{#each teacher_group as teacher_group_obj, i}
				<div class="m-10 p-4 mb-0 rounded-xl bg-base-200">
					<div class="flex flex-row justify-between">
						<h1 class="text-lg font-bold">Pair {i + 1}</h1>
						<button
							on:click={() => {
								teacher_group = teacher_group.filter((item, index) => index !== i);
							}}
							class="btn btn-circle font-bold btn-sm btn-error">X</button
						>
					</div>
					<div class="grid flex-grow card rounded-box">
						<div>
							<div class="label">
								<span class="label-text">Teacher</span>
							</div>

							<select
								id="divisionSelect"
								bind:value={teacher_group_obj.teacher}
								class="input input-bordered w-full"
								placeholder="Select Teacher"
								on:change={(event) => {
									fetchClassgroup(event.target.value, i);
								}}
							>
								{#each teachers as division}
									<option value={division.value}>{division.label}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="flex w-full">
						<div class="grid flex-grow card rounded-box">
							<div>
								<div class="label">
									<span class="label-text">Class</span>
								</div>
								<select
									id="divisionSelect"
									bind:value={teacher_group_obj.classgroup}
									class="input input-bordered w-full"
								>
									{#each teacher_group_obj.classgroups as division}
										<option value={division}
											>{division.label} -- <span class="font-bold">{division.group}</span></option
										>
									{/each}
								</select>
							</div>
						</div>
					</div>

					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div tabindex="0" class="mt-5 collapse collapse-arrow border border-base-300 bg-white">
						<div class="collapse-title text-xl font-medium">Students That join</div>
						<div class="collapse-content">
							<h1>WIP</h1>
						</div>
					</div>
				</div>
			{/each}

			<button
				class="m-12 mt-3 btn btn-primary w-2/6"
				on:click={() => {
					handleAddTeachGroup();
				}}>Add more Teacher Group Pair</button
			>

			{#if hasDuplicates(teacher_group)}
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Error! There are duplicates</span>
				</div>
			{/if}
			{#if teacher_group.length < 1}
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Error! Must have one class group</span>
				</div>
			{/if}
		</div>
	</div>

	<div class="form-control w-full mt-3 p-6 border-solid border-base-200 border-2 rounded-lg">
		<h1 class="font-bold">Create Marking Scheme</h1>

		{#each p_array as p_object, i}
			<div class="m-2 p-2 border-solid border-base-200 border-2 bg-base-200 rounded-lg">
				<div class="flex flex-row justify-between">
					<h1 class="text-xl font-bold">Component {i + 1}</h1>
					<button
						on:click={() => {
							p_array = p_array.filter((item, index) => index !== i);
						}}
						class="btn btn-circle font-bold btn-sm btn-error">X</button
					>
				</div>
				<div class="flex w-full">
					<div class="grid flex-grow card rounded-box">
						<div>
							<div class="label">
								<span class="label-text">Name</span>
							</div>
							<input
								bind:value={p_object.name}
								placeholder="Type here"
								class="input input-bordered w-full"
							/>
						</div>
					</div>
				</div>
				<div class="flex w-full">
					<div class="grid flex-grow card rounded-box">
						<div>
							<div class="label">
								<span class="label-text">Weight</span>
							</div>
							<input
								type="number"
								bind:value={p_object.weight}
								placeholder="Type here"
								class="input input-bordered w-full"
							/>
						</div>
					</div>
					<div class="divider divider-horizontal" />
					<div class="grid flex-grow card rounded-box">
						<div>
							<div class="label">
								<span class="label-text">Full Mark</span>
							</div>
							<input
								type="number"
								bind:value={p_object.fullmark}
								placeholder="Type here"
								class="input input-bordered w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		{/each}
		{#if p_array.length < 5}
			<button on:click={addNewItem} class="mt-4 btn btn-secondary btn-outline"
				>Add Another Mark</button
			>
		{/if}

		<button
			on:click={() => {
				handleCreateExam();
			}}
			class="mt-4 btn btn-secondary">Create Exam</button
		>

		<!-- Maximum 4 items -->
	</div>
</div>
