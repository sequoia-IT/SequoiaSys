<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { USER_NAME, USER_SUBJECT } from '$lib/store';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		goto('/login', { replaceState: true });
	};

	// USER_SUBJECT.set(subjectextractor(data.session.user.email));
	// USER_SUBJECT.set("English");
	// USER_NAME.set("Chua");
	// USER_SUBJECT.set("malay");
	// USER_NAME.set(data.user?.name);
	//TODO

	$: teacher_classes = removeDuplicates(data.classes);

	function removeDuplicates(arr) {
		const unique = {};
		const result = [];

		for (const item of arr) {
			const classCode = item.class_codes;

			if (!unique[classCode]) {
				result.push(item);
				unique[classCode] = true;
			}
		}

		return result;
	}
</script>

<div class="text-center">
	<h1 class="text-5xl">Welcome {$USER_NAME}</h1>
	<img alt="userimage" src="user-profile.png" class="mt-4 image-full w-10 mx-auto" />

	<h1>Your Subject</h1>
	<p>{$USER_SUBJECT}</p>
	<div>
		<h2 class="mt-7 text-2xl">Account Settings</h2>
		<ul class="mt-2 menu bg-base-200 w-56 rounded-box mx-auto">
			<li><button on:click={handleSignOut} disabled>Account Info</button></li>
			<li><button on:click={handleSignOut} disabled>Timetable</button></li>
			<li><button on:click={handleSignOut}>Logout</button></li>
		</ul>
	</div>
	<div class="flex flex-row">
		<div class="w-1/2 px-5">
			<h2 class="mt-7 text-2xl">Mark your division Class</h2>
			<ul class="mt-2 menu bg-base-200 rounded-box mx-auto">
				{#if teacher_classes}
					{#each teacher_classes as classroom (classroom.class_codes)}
						<li>
							<a
								class="mb-2 justify-center"
								data-sveltekit-preload-data="off"
								href="/teacher/division/{classroom.class_codes}">{classroom.class_codes}</a
							>
						</li>
					{/each}
				{:else}
					<p>No Classes found</p>
					<p>if wrong contact admin</p>
				{/if}
			</ul>
		</div>
		<div class="w-1/2 px-5">
			<h2 class="mt-7 text-2xl">Your Classes</h2>
			<ul class="mt-2 menu bg-base-200 rounded-box mx-auto">
				{#if teacher_classes}
					{#each teacher_classes as classroom}
						<li>
							<a
								class="mb-2 justify-center"
								data-sveltekit-preload-data="off"
								href="/teacher/class/{classroom.class_codes}">{classroom.class_codes}</a
							>
						</li>
					{/each}
				{:else}
					<p>No Classes found</p>
					<p>if wrong contact admin</p>
				{/if}
			</ul>
		</div>
	</div>

	{#if $USER_NAME === 'admin' || true}
		<div>
			<h2 class="mt-7 text-2xl">Admin Settings</h2>
			<ul class="mt-2 menu bg-base-200 w-56 rounded-box mx-auto">
				<li><a href="/admin/student/">Manage Students</a></li>
			</ul>
		</div>
		<div>
			<h2 class="mt-7 text-2xl">Exam Community Settings</h2>
			<ul class="mt-2 menu bg-base-200 w-56 rounded-box mx-auto">
				<li><a href="/exam/create">Create Exam</a></li>
			</ul>
		</div>
	{/if}
</div>
