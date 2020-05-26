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
							class="nav-link mb-sm-3 mb-md-0 active"
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
				<h2>Subscription/Account</h2>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	middleware: 'authenticated',
	layout: 'layout-tool',
	data() {
		return {
			subscriptionInfo: '',
			billingInfo: [
				{
					info: 'No billing info available',
				},
			],
		};
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user']),
	},
	methods: {
		// get billing info for user TODO
		async getBillingInfo() {
			console.log('retrieving billing info for clent:');
		},
		// get subscription info for user TODO
		async getSubscriptionInfo() {
			console.log('retrieving subscription info for client');
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.subscriptionInfo = await this.$axios.$get(
				process.env.baseAPI + '/subscription/getbillinginfo'
			);
			console.log(this.subscriptionInfo);
		},
		// download all data related to billing to a CSV file
		printBillingHistory() {
			console.log('printing billing history');
		},
	},
	mounted() {
		this.subscriptionInfo();
	},
};
</script>
