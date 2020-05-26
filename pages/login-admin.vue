<template>
	<card class="p-5">
		<img src="~/assets/images/icon.png" class="text-center image" />
		<form role="form" class="px-5 m-5">
			<base-input v-model="email" placeholder="Email" addon-left-icon="ni ni-email-83"></base-input>
			<base-input
				type="password"
				v-model="password"
				placeholder="Password"
				addon-left-icon="ni ni-lock-circle-open"
			></base-input>
			<base-checkbox v-model="remember_me" class="text-center">Remember me</base-checkbox>
			<div class="text-center">
				<base-button type="primary" class="my-4" @click.prevent="loginAdmin">Sign In</base-button>
			</div>
		</form>
		<div class="row mt-3">
			<div class="col-5 text-left">
				<nuxt-link to="/tool/">
					<a href="#" class="text-light">
						<small>User Portal</small>
					</a>
				</nuxt-link>
			</div>
			<div class="col-3">
				<nuxt-link to="/login-admin-forgot-password">
					<a href="#" class="text-light text-center">
						<small>Forgot password?</small>
					</a>
				</nuxt-link>
			</div>
			<div class="col-4 text-right">
				<nuxt-link to="/register-admin">
					<a href="#" class="text-light">
						<small>Register as an Admin</small>
					</a>
				</nuxt-link>
			</div>
		</div>
	</card>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'login-admin',
	layout: 'layout-tool',
	data() {
		return {
			email: '',
			password: '',
			remember_me: ''
		};
	},
	computed: {
		...mapState('auth')
	},
	methods: {
		// Login as an administrator
		async loginAdmin() {
			await this.$auth
				.loginWith('local2', {
					data: {
						email: this.email,
						password: this.password,
						remember_me: this.remember_me
					}
				})
				.then(res => {
					this.$toast.success(res);
					this.$router.push('/tool/analytics/analytics-overview');
				})
				.catch(err => {
					this.$toast.error(err);
				});
		},
		// logout the current user
		async logout() {
			await this.$auth.logout();
		}
	},
	mounted() {
		this.logout();
	}
};
</script>
<style scoped>
.image {
	padding: 0px 170px;
}
</style>