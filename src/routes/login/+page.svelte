<!-- // src/routes/auth/+page.svelte -->
<script>
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email;
	let password;

	const handleSignIn = async () => {
		const { data: userData, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		console.log(userData, 'error', error);
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
				<button on:click={handleSignIn} class="btn btn-primary">Sign In</button>
			</div>
		</form>
	</div>
</div>
