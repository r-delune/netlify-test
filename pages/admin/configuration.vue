<template>
	<div>
		<div class="row">
			<div class="col-5"></div>
			<div class="col-7">
				<ul class="nav nav-pills nav-fill flex-column flex-sm-row" id="tabs-text" role="tablist">
					<li class="nav-item">
						<a
							class="nav-link mb-sm-3 mb-md-0"
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
							class="nav-link mb-sm-3 mb-md-0 active"
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
		<div class="col-sm-12 text-center p-2">
			<div class="container col-xs-12 col-sm-12 p-5">
				<h2>Configuration</h2>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'configuration',
	middleware: 'authenticated',
	layout: 'layout-tool',
	data() {
		return {
			configuration: ''
		};
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	methods: {
		// get subscription details
		async getConfiguration() {
			console.log('retrieving configuration settings info for clent:');
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.configuration = await this.$axios.$get(
				'api/configuration/getconfiguration'
			);
			console.log(this.configuration);
		},
		setConfiguration() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.$axios
				.$post(process.env.baseAPI + '/configuration/setconfiguration', {
					client_id: user.client_id
				})
				.then(configuration => {
					this.configuration = configuration;
					// TODO: Set local configuration
					//this.$store.commit('configuration/setConfiguration', user_config)
				});
		}
	},
	mounted() {
		this.getConfiguration();
	}
};
</script>
