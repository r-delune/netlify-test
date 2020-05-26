<template>
	<div>
		<div class="row p-1">
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
							<nuxt-link to="analytics-users">Users</nuxt-link>
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
							<nuxt-link to="analytics-trends">Trends</nuxt-link>
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link color-white mb-sm-3 mb-md-0 active"
							id="tabs-text-3-tab"
							data-toggle="tab"
							role="tab"
							aria-controls="tabs-text-3"
							aria-selected="false"
						>
							<nuxt-link to="analytics-overview">Overview</nuxt-link>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- User Types -->
		<div class="row p-5">
			<div class="col-3">
				<h6 class="text-uppercase text-muted">Total Admins:</h6>
				<h2>{{ users.count_admins || 0 }}</h2>
				<h6 class="text-uppercase text-muted">Total Users:</h6>
				<h2>{{ users.count_users || 0 }}</h2>
			</div>
			<div class="col-4">
				<client-only>
					<Doughnut :chartData="user_completion_data" :options="doughnut_chart_options_1" :height="170"></Doughnut>
				</client-only>
			</div>
			<div class="col-4">
				<client-only>
					<Doughnut :chartData="user_type_data" :options="doughnut_chart_options_2" :height="170"></Doughnut>
				</client-only>
			</div>
		</div>
		<!-- Engagement Chart -->
		<card type="default" header-classes="bg-transparent">
			<div slot="header" class="row align-items-center">
				<div class="col">
					<h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
					<h5 class="h3 text-white mb-0">Engagement</h5>
				</div>
				<div class="col">
					<ul class="nav nav-pills justify-content-end">
						<li class="nav-item mr-2 mr-md-0">
							<a
								class="nav-link py-2 px-3"
								href="#"
								:class="{active: engagement_chart.activeIndex === 0}"
								@click.prevent="renderEngagementChart(0)"
							>
								<span class="d-none d-md-block">Weekly</span>
								<span class="d-md-none">M</span>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link py-2 px-3"
								href="#"
								:class="{active: engagement_chart.activeIndex === 1}"
								@click.prevent="renderEngagementChart(1)"
							>
								<span class="d-none d-md-block">Monthly</span>
								<span class="d-md-none">W</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<client-only>
				<LineChart :options="engagement_chart_options" :chartData="engagement_graph_data"></LineChart>
			</client-only>
		</card>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import LineChart from '~/components/charts/LineChart';
import Doughnut from '~/components/charts/Doughnut';
export default {
	middleware: 'authenticated',
	layout: 'layout-tool',
	name: 'analytics-overview',
	data() {
		return {
			engagement_graph_data: [],
			engagement_data: {},
			user_type_data: {},
			user_completion_data: {},
			engagement_chart: {
				activeIndex: 0
			},
			engagement_chart_options: {
				responsive: true,
				maintainAspectRatio: false
			},
			doughnut_chart_options_1: {
				responsive: true,
				maintainAspectRatio: false
			},
			doughnut_chart_options_2: {
				responsive: true,
				maintainAspectRatio: false
			},
			completion_data: 0,
			user_types: 0,
			users: []
		};
	},
	components: {
		Doughnut,
		LineChart
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	methods: {
		// Retrieve all data relating to client engagement
		async getUserEngagementData() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.engagement_data = await this.$axios.$get(
				process.env.baseAPI + '/analytics/getuserengagementdata'
			);
			console.log(this.engagement_data);
			this.renderEngagementChart(0);
			this.renderUserTypeChart(0);
			this.renderCompletionChart(0);
		},
		// Retrieve all data relating to client profiles
		async getProfileData() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.profile_data = await this.$axios.$get(
				process.env.baseAPI + '/analytics/getprofiledata'
			);
			console.log(this.profile_data);
		},
		// Retrieve all data relating to profile completion/progress
		async getUserCompletionData() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.completion_data = await this.$axios.$post(
				process.env.baseAPI + '/analytics/getusercompletiondata'
			);
			console.log(this.completion_data);
		},
		// Represent user completion rates per user type
		renderCompletionChart(index) {
			self = this;
			this.user_completion_data = {
				labels: ['Non Completed', 'Moderate Completed', 'Severe Completed'],
				datasets: [
					{
						label: 'Completion',
						data: [
							self.engagement_data.completed_non_user,
							self.engagement_data.completed_moderate_user,
							self.engagement_data.completed_severe_user
						],
						borderColor: 'green',
						backgroundColor: 'rgba(82, 95, 127, 1)'
					}
				]
			};
		},
		// Represent count of user types
		renderUserTypeChart(index) {
			self = this;
			this.user_type_data = {
				labels: ['Non Users', 'Moderate Users', 'Severe Users'],
				datasets: [
					{
						label: 'User Type',
						data: [
							self.engagement_data.count_non_user,
							self.engagement_data.count_moderate_user,
							self.engagement_data.count_severe_user
						],
						borderColor: 'red',
						backgroundColor: 'rgba(82, 95, 127, 1)'
					}
				]
			};
		},
		// Represent engagement by user type TODO
		renderEngagementChart(index) {
			var weeks = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sunday'];
			var months = ['January', 'February', 'March', 'April', 'May'];
			var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
			var time = [weeks, months, years];

			var user_types_list = ['Non-Users', 'Moderate', 'Severe'];
			this.user_types = [
				{
					label: 'Non-users',
					data: this.engagement_data.non_users,
					borderColor: 'rgba(255, 56, 96, 0.5)',
					backgroundColor: 'rgba(255, 56, 96, 0.1)'
				},
				{
					label: 'Risky',
					borderColor: 'rgba(255, 56, 96, 0.5)',
					backgroundColor: 'rgba(255, 56, 96, 0.1)',
					data: this.engagement_data.moderate
				},
				{
					label: 'Severe',
					borderColor: 'rgba(255, 56, 96, 0.5)',
					backgroundColor: 'rgba(255, 56, 96, 0.1)',
					data: this.engagement_data.severe
				}
			];

			self.engagement_graph_data = {
				labels: time[index],
				datasets: [
					{
						label: 'Non',
						borderColor: 'rgba(255, 56, 96, 0.5)',
						data: [0, 0, 10, 30, 15, 40, 25, 60, 60]
					},
					{
						borderColor: 'green',
						label: 'Moderate',
						data: [20, 60, 10, 32, 15, 90, 80, 60, 70]
					},
					{
						label: 'Severe',
						borderColor: 'yellow',
						data: [0, 20, 10, 30, 15, 40, 40, 60, 60]
					}
				]
			};
		}
	},
	mounted() {
		this.getAllUserInfo();
		this.getUserEngagementData();
		this.getProfileData();
	}
};
</script>