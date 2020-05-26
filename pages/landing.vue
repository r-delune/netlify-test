<template>
	<section class="section section-shaped section-lg my-0">
		<div class="container pt-lg-md">
			<div class="row justify-content-center">
				<div class="col-">
					<card type="secondary" shadow>
						<template>
							<card type="secondary" shadow>
								<label>
									Welcome.
									<span class="text-success font-weight-700">MyUse</span> is about making more mindful decisions when it comes to take drugs. It is also about having fun while in college.
									In the first part of your MyUse journey, you will build you own personalized profile as a student, and you will get feedback that can help you improve more your profile.
									In the second section, a series of activities that will help you get the most out of college life without putting yourself on risk.
									Are you randomly choosing what to get out of college, or are you aware of your choices?
									Let’s see this together!
								</label>
							</card>
							<form role="form" class="text-center">
								<div>
									<base-button type="primary" class="my-4" @click.stop="registerUser()">Go!</base-button>
								</div>
								<small>
									<span>
										Been before?
										<nuxt-link to="/login-user">
											<a class="text-light text-center">Login</a>
										</nuxt-link>
									</span>
								</small>
								<small>
									<span>
										/
										<nuxt-link to="/login-admin">
											<a class="text-light text-center">Admin Portal</a>
										</nuxt-link>
									</span>
								</small>
							</form>
						</template>
					</card>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'tool',
	layout: 'layout-tool',
	computed: {
		...mapState('auth', ['loggedIn', 'user']),
	},
	methods: {
		// register this new user
		async registerUser() {
			await this.$axios
				.$get(process.env.baseAPI + '/auth/register_profile')
				.then(data => {
					this.loginUser(data);
				})
				.catch(err => {
					this.$toast.error('Error while authenticating register user: ' + err);
				});
		},
		// Login as a user
		async loginUser(data) {
			this.$axios.setToken(data.access_token, 'Bearer');
			await this.$auth
				.loginWith('local', {
					data: { password: data.profile.password },
				})
				.then(res => {
					// TODO: Use redirect from Nuxt auth module
					if (this.loggedIn) {
						this.$store.commit('navigation/setCurrentModule', 1);
						this.$router.push('/tool/modules');
						this.$toast.success('Welcome to MyUSE!');
					}
				})
				.catch(err => {
					this.$toast.success('Error while authenticating!');
				});
		},
		// logout the current user
		async logout() {
			if (this.loggedIn) {
				this.$axios.setToken(this.user.access_token, 'Bearer');
				this.$auth
					.logout()
					.then(result => {
						this.$router.push('/tool/landing');
					})
					.catch(err => {
						this.$toast.error('Logout Error: ' + err);
					});
			}
		},
	},
	created() {
		this.logout();
	},
};
</script>





