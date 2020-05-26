<template>
	<card class="card-body">
		<div class="text-center">
			<img src="~/assets/images/icon.png" class="justify-content-center image" />
		</div>
		<form class="p-5">
			<base-input
				alternative
				class="mb-5"
				v-model="code"
				placeholder="Use your code to recall a session"
				addon-left-icon="ni ni-lock-circle-open"
			></base-input>
			<base-checkbox v-model="remember_me" class="text-center">Remember me</base-checkbox>
			<div class="text-center">
				<base-button type="primary" class="my-4" @click.prevent="login">Sign In</base-button>
			</div>
		</form>
		<div class="row mt-3">
			<div class="col-6">
				<nuxt-link to="/tool/">
					<a href="#" class="text-light">
						<small>Back</small>
					</a>
				</nuxt-link>
			</div>
			<div class="col-6 text-right">
				<nuxt-link to="/tool/register-admin">
					<a href="#" class="text-light">
						<small>Register as admin</small>
					</a>
				</nuxt-link>
			</div>
		</div>
	</card>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'login-user',
	layout: 'layout-tool',
	data() {
		return {
			code: '',
			remember_me: ''
		};
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	methods: {
		// login a previous user
		async login() {
			await this.$auth
				.loginWith('local', {
					data: {
						password: this.password,
						remember_me: this.remember_me
					}
				})
				.then(result => {
					if (this.loggedIn) {
						this.$store.commit('profile/recallProfile', this.user.profile);
						this.$store.commit(
							'navigation/setCurrentModule',
							this.user.profile.current_module
						);
						this.$toast.success('Welcome back!');
						this.$router.push('/tool/');
					} else {
						this.$toast.error('Error logging in Profile');
					}
				})
				.catch(err => {
					console.log(err);
					this.$toast.error('User not Found');
				});
		}
	},
	mounted() {
		this.$auth.logout();
	}
};
</script>