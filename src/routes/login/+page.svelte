<!-- // src/routes/auth/+page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { USER_EMAIL, USER_NAME, USER_SUBJECT } from '$lib/store.js';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email;
	let password;
	let loading = false;

	const handleSignIn = async () => {
		loading = true;
		const { data: userData, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (email) {
			const { data: teacher } = await supabase
				.from('Teachers')
				.select(`name,subject`)
				.eq('email', email)
				.single();
			if (teacher) {
				USER_SUBJECT.set(teacher.subject);
				USER_NAME.set(teacher.name);
				console.log($USER_NAME);
			} else {
				USER_SUBJECT.set('NO_SUBJECT_FOUND'.toLocaleLowerCase());
				USER_NAME.set('NO_USER_FOUND');
			}
			USER_EMAIL.set(email);
		}

		if (!error) {
			goto('/teacher', { replaceState: true });
		}
	};
</script>

<div class="flex items-center justify-center h-screen">
	<div class="max-w-lg">
		<h1 class="text-3xl font-bold">Login</h1>
		<form>
			<div class="form-control w-full max-w-lg">
				<div class="label">
					<span class="label-text">Email</span>
				</div>
				<input
					type="email"
					bind:value={email}
					placeholder="Type here"
					class="input input-bordered w-full max-w-lg"
				/>
			</div>

			<div class="form-control w-full max-w-lg">
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<input
					type="password"
					bind:value={password}
					placeholder="Type here"
					class="input input-bordered w-full max-w-lg"
				/>
			</div>

			<div class="pt-10">
				<a href="/signup" class="btn btn-link btn-primary">Register</a>
				<button disabled={loading} on:click={handleSignIn} class="btn btn-primary">Sign In</button>
			</div>
			<div class="pt-3">
				<button on:click={handleSignIn} class="btn btn-link">Forgot your password?</button>
			</div>
		</form>
	</div>
</div>
