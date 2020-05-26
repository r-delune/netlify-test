<template>
	<div>
		<div class="row">
			<div class="col-5"></div>
			<div class="col-7">
				<ul class="nav nav-pills nav-fill flex-column flex-sm-row" id="tabs-text" role="tablist">
					<li class="nav-item">
						<a
							class="nav-link mb-sm-3 mb-md-0 active"
							id="tabs-text-1-tab"
							data-toggle="tab"
							role="tab"
							aria-controls="tabs-text-1"
							aria-selected="true"
						>
							<nuxt-link to="profile">Profile</nuxt-link>
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link mb-sm-3 mb-md-0"
							id="tabs-text-2-tab"
							data-toggle="tab"
							role="tab"
							aria-controls="tabs-text-2"
							aria-selected="false"
						>
							<nuxt-link to="billing">Account</nuxt-link>
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link mb-sm-3 mb-md-0"
							id="tabs-text-3-tab"
							data-toggle="tab"
							role="tab"
							aria-controls="tabs-text-3"
							aria-selected="false"
						>
							<nuxt-link to="configuration">Configuration</nuxt-link>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="col-sm-12 text-center">
			<div class="container col-xs-12 col-sm-12 p-5">
				<h2>{{ user['email'] }}</h2>
				<p>
					<strong>Role:</strong>
					{{ user['role'] }}
				</p>
				<p>
					<strong>Logged In:</strong>
					{{ user.last_login }}
				</p>
				<p>
					<strong>Created at:</strong>
					{{ user.created_at }}
				</p>
				<p>
					<strong>Updated:</strong>
					{{ user.updated_at }}
				</p>
				<base-button type="primary" class="my-4" @click.prevent="logout()">Logout</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	middleware: 'auth',
	layout: 'default',
	computed: {
		...mapState('auth', ['user']),
	},
	methods: {
		// logout the current user
		async logout() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.$auth
				.logout()
				.then(result => {
					this.$router.push({ path: 'landing' });
				})
				.catch(err => {
					this.$toast.error('Logout Error: ' + err);
				});
		},
	},
};
</script>
<style scoped>
.container {
	position: relative;
	margin: 0 auto;
}
</style>
