<script lang="ts">
	import Select from 'svelte-select';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	let academic_years = data.academic_years;

	let academic_year = academic_years?.academic_year;
	let term = academic_years?.term;
	let subject;
	let division;

	const fetchSubjects = async () => {
		const { data } = await supabase
			.from('Subjects')
			.select('Abbreviation,Name')
			.eq('hasExam', 'TRUE');
		return transformArray(data);
	};

	const fetchDivision = async () => {
		if (subject) {
			const { data } = await supabase
				.from('Teacher_Classes')
				.select('group')
				.ilike('subject', subject);
			return data;
		}
	};

	function transformArray(arr) {
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
		<h1 class="font-bold">Select Exam Subject and Division</h1>
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
					/>
					{subject}
				</div>
			</div>
			<div class="divider divider-horizontal" />
			<div class="grid flex-grow card rounded-box">
				<div>
					<div class="label">
						<span class="label-text">Division</span>
					</div>
					{#if subject}
						<Select
							placeholder="Select Division"
							clearable={true}
							bind:justValue={division}
							class="input input-bordered w-full"
							loadOptions={fetchDivision}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="form-control w-full pt-3">
		<h1 class="font-bold">Select Class Group</h1>
		<div class="flex w-full">
			<div class="grid flex-grow card rounded-box">
				<div>
					<div class="label">
						<span class="label-text">Class</span>
					</div>
					<input
						type="text"
						bind:value={division}
						placeholder="Type here"
						class="input input-bordered w-full"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
