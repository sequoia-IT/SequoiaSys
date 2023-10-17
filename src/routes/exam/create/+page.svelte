<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let academic_year;
</script>

<h1>Create Exam</h1>

<div class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">Academic Year</span>
	</div>
	<input
		type="email"
		bind:value={academic_year}
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
	/>
</div>
