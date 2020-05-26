<template>
	<card class="card-body">
		<div class="text-center">
			<img src="~/assets/images/icon.png" class="image" />
		</div>
		<form role="form" class="px-5 mx-5">
			<base-input class="mb-3" v-model="email" placeholder="Email" addon-left-icon="ni ni-email-83"></base-input>
			<base-input
				type="password"
				placeholder="Password"
				v-model="password"
				addon-left-icon="ni ni-lock-circle-open"
			></base-input>
			<base-checkbox v-model="remember_me" class="text-center">Remember me</base-checkbox>
			<base-input
				type="password"
				v-model="password_confirmation"
				placeholder="Confirm Password"
				addon-left-icon="ni ni-lock-circle-open"
			></base-input>
			<password
				v-model="password"
				@score="showScore"
				@feedback="showFeedback"
				:strength-meter-only="true"
			/>
			<base-checkbox v-model="agreed_privacy" class="text-center">
				<span>
					I agree to the
					<a href="/tool/privacy">Privacy Policy</a>
				</span>
			</base-checkbox>
			<div class="text-center">
				<base-button type="primary" class="my-4" @click.prevent="registerAdmin">Create account</base-button>
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
				<nuxt-link to="/login-admin">
					<a href="#" class="text-light">
						<small>Login as an Admin</small>
					</a>
				</nuxt-link>
			</div>
		</div>
	</card>
</template>
<script>
import { mapState } from 'vuex';
import Password from 'vue-password-strength-meter';
export default {
	layout: 'layout-tool',
	name: 'register-admin',
	data() {
		return {
			email: '',
			password: '',
			password_confirmation: '',
			password_feedback: '',
			agreed_privacy: false,
			remember_me: ''
		};
	},
	components: {
		Password
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	methods: {
		// TODO: Display feedback related to password strength
		showFeedback({ suggestions, warning }) {
			this.password_feedback = suggestions[0];
		},
		// TODO: Display score related to password strength
		showScore(score) {
			console.log('💯', score);
		},
		// Register a new admin account
		async registerAdmin() {
			if (this.agreed_privacy) {
				var self = this;
				await this.$axios
					.$post(process.env.baseAPI + '/auth/register_admin', {
						email: self.email,
						password: self.password,
						password_confirmation: self.password_confirmation
					})
					.then(result => {
						this.loginAdmin(result);
					})
					.catch(err => {
						self.$toast.error('Error registering new admin');
					});
			} else {
				this.$toast.error('You must agree to the privacy policy');
			}
		},
		// Login as an administrator
		async loginAdmin(data) {
			this.$axios.setToken(data.access_token, 'Bearer');
			await this.$auth
				.loginWith('local2', {
					data: {
						email: this.email,
						password: this.password,
						remember_me: this.remember_me
					}
				})
				.then(res => {
					if (this.loggedIn) {
						this.$toast.success(res);
						this.$router.push('/tool/analytics/analytics-overview');
					}
				})
				.catch(err => {
					this.$toast.error(err[0]);
				});
		}
	}
};
</script>