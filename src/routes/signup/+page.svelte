<!-- // src/routes/auth/+page.svelte -->
<script>
// @ts-nocheck

	import Select from 'svelte-select';
	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);


    let items = data.teachers.map(emailObj => ({ "value": emailObj.email, "label": emailObj.email }));
	let email="";
	let password="";

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email : email.value,
			password,
			options: {
				emailRedirectTo: `${location.origin}/login`
			}
		});
	};
</script>

<div>
	<h1 class="text-3xl font-bold">Signup</h1>
	<form on:submit={handleSignUp}>
		<div class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<Select
				placeholder="Select your past email"
				{items}
				clearable={true}
				bind:value={email}
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		<div class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		<div class="pt-10">
			<button class="btn btn-primary">Sign up</button>
		</div>
	</form>
</div>
