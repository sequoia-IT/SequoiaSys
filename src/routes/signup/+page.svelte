<!-- // src/routes/auth/+page.svelte -->
<script>
	import Select from 'svelte-select';
	export let data;
	import { goto } from '$app/navigation';

	let { supabase } = data;
	$: ({ supabase } = data);
	let items = [{}];
	if (data.teachers) {
		items = data.teachers.map((emailObj) => ({ value: emailObj.email, label: emailObj.email }));
	} else {
		items = [];
	}

	let email = { value: '', label: '' };
	let password = '';
	let hint = '';

	const handleSignUp = async () => {
		const { data: UserData } = await supabase.auth.signUp({
			email: email.value,
			password,
			options: {
				emailRedirectTo: `${location.origin}/login`
			}
		});

		const { error } = await supabase
			.from('Teachers')
			.update({ isregistered: true })
			.ilike('email', email.value)
			.select();

		if (error) {
			alert('Error something happened');
		}
		if (UserData) {
			goto('/teacher', { replaceState: true });
		}
	};

	const handleSelected = () => {
		hint = 'Hint: You can search';
	};
</script>

<div>
	<h1 class="text-3xl font-bold">Register</h1>
	<form on:submit={handleSignUp}>
		<div class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Email</span>
				<span class="label-text">{hint}</span>
			</div>
			{#if items.length > 0}
				<Select
					placeholder="Select your past email"
					{items}
					clearable={true}
					bind:value={email}
					class="input input-bordered w-full max-w-xs"
					on:focus={handleSelected}
					on:blur={() => {
						hint = '';
					}}
				/>
			{/if}
		</div>

		<div class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				type="password"
				bind:value={password}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>

		<div class="pt-10">
			<button class="btn btn-primary">Sign up</button>
			<a href="/login" class="btn btn-link">Login</a>
		</div>
	</form>
</div>
