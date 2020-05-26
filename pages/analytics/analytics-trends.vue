<template>
	<div>
		<!-- Header/Nav -->
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
							class="nav-link mb-sm-3 mb-md-0 active"
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
							class="nav-link mb-sm-3 mb-md-0"
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
		<!-- Stats -->
		<div class="row p-5">
			<div class="col-4">
				<h6 class="text-uppercase text-muted">Most used:</h6>
				<h2>
					Cannabis
					<!-- {{ most_common || 'None Found'  }} -->
				</h2>
				<h6 class="text-uppercase text-muted">Revisiting Users:</h6>
				<h2>{{ profile_data.returning_user_count || 0 }}</h2>
			</div>
			<div class="col-2">
				<h6 class="text-uppercase text-muted">Profiles:</h6>
				<h2>{{ profile_data.profile_count|| 0}}</h2>
				<h6 class="text-uppercase text-muted">Admins:</h6>
				<h2>{{ profile_data.users_count - profile_data.profile_count || 0 }}</h2>
			</div>
			<div class="col-6">
				<client-only>
					<Doughnut :chartData="this.user_type_data" :options="doughnutOptions" :height="170"></Doughnut>
				</client-only>
			</div>
		</div>
		<!-- Drug Use Chart -->
		<!-- <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
                <div class="col">
                    <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                    <h5 class="h3 text-white mb-0">Profiles</h5>
                </div>
                <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                        <li class="nav-item mr-2 mr-md-0">
                            <a class="nav-link py-2 px-3"
                            href="#"
                            :class="{active: drugUseChart.activeIndex === 0}"
                            @click.prevent="renderDrugUseChart(0)">
                                <span class="d-none d-md-block">Week</span>
                                <span class="d-md-none">M</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link py-2 px-3"
                            href="#"
                            :class="{active: drugUseChart.activeIndex === 1}"
                            @click.prevent="renderDrugUseChart(1)">
                                <span class="d-none d-md-block">Month</span>
                                <span class="d-md-none">W</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link py-2 px-3"
                            href="#"
                            :class="{active: drugUseChart.activeIndex === 2}"
                            @click.prevent="renderDrugUseChart(2)">
                                <span class="d-none d-md-block">Year</span>
                                <span class="d-md-none">W</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
		<LineChart :chartData="this.drug_type_data" :width="800" :height="300"></LineChart>-->
		<!-- </card> -->
		<card type="default" header-classes="bg-transparent">
			<div class="row p-5">
				<div class="col-12">
					<client-only>
						<BarChart :height="180" ref="drugUseChart" :chart-data="drugUseChart.chartData"></BarChart>
					</client-only>
				</div>
			</div>
		</card>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import LineChart from '~/components/charts/LineChart';
import Doughnut from '~/components/charts/Doughnut';
import BarChart from '~/components/charts/BarChart';
export default {
	middleware: 'authenticated',
	layout: 'layout-tool',
	name: 'analytics-overview',
	data() {
		return {
			user_completion_data: [],
			chartdata: [],
			least_common: 'None',
			most_common: 'None',
			profile_data: [],
			drug_type_data: [],
			doughnutOptions: {
				responsive: true,
				chartData: {}
			},
			drugUseChart: {
				activeIndex: 0,
				chartData: {}
			},
			user_type_data: '',
			users: []
		};
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	components: {
		LineChart,
		BarChart,
		Doughnut
	},
	methods: {
		// Retrieve trend data based on the current client ID
		async getProfileData() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.profile_data = await this.$axios.$get(
				process.env.baseAPI + '/analytics/getprofiledata'
			);
			this.least_common = this.profile_data.least_common_drug;
			this.most_common = this.profile_data.most_common_drug;
			this.renderDrugTypeChart(0);
			this.renderUserTypeChart(0);
			console.log(this.profile_data);
		},
		// Represent count of user types
		renderUserTypeChart(index) {
			this.user_type_data = {
				labels: ['Non-User', 'Moderate', 'Severe', 'Undetermined'],
				datasets: [
					{
						label: 'Cannabis',
						data: [
							this.profile_data.non_users_count,
							this.profile_data.moderate_users_count,
							this.profile_data.severe_users_count,
							this.profile_data.undetermined_users_count
						]
					}
				]
			};
		},
		// Represent data on drug types and their use TODO
		renderDrugTypeChart(index) {
			let chartData = {
				datasets: [
					{
						label: 'Drug Types',
						backgroundColor: '#f87979',
						pointBackgroundColor: 'green',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: this.profile_data.drug_use_count
					}
				],
				labels: this.profile_data.drug_names,
				options: {
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									display: true
								}
							}
						],
						xAxes: [
							{
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									display: false
								}
							}
						]
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: true,
						mode: 'single',
						callbacks: {
							label: function(tooltipItems, data) {
								return '$' + tooltipItems.yLabel;
							}
						}
					},
					responsive: true,
					maintainAspectRatio: false,
					height: 200
				}
			};
			this.drugUseChart.chartData = chartData;
			this.drugUseChart.activeIndex = index;
			this.drugUseChart.options = chartData.options;
		},
		// Represent data on drug use TODO
		renderDrugUseChart(index) {
			var weeks = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sunday'];
			var months = ['January', 'February', 'March', 'April', 'May'];
			var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
			var time = [weeks, months, years];

			// TODO: For loop here, to be completed
			this.drug_type_data = {
				labels: time[index],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
					},
					{
						label: 'Ecstasy',
						borderColor: 'rgba(255, 56, 96, 0.5)',
						backgroundColor: 'green',
						data: [20, 50, 20, 10, 30, 15, 40, 20, 60, 60]
					},
					{
						label: 'Ketamine',
						borderColor: 'yellow',
						backgroundColor: 'yellow',
						data: [20, 40, 20, 10, 30, 65, 40, 20, 60, 80]
					}
				]
			};
		}
	},
	mounted() {
		this.getProfileData();
		this.renderDrugUseChart(0);
	}
};
</script>