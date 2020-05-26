<template>
	<div>
		<!-- Header/Nav -->
		<div class="row p-1">
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
		<!-- Users Table -->
		<template>
			<card>
				<client-only>
					<vuetable
						ref="vuetable"
						:api-mode="false"
						:fields="table_fields"
						:data="users"
						:sort-order="sortOrder"
						data-path="data"
						:per-page="5"
						pagination-path
						@vuetable:pagination-data="onPaginationData"
					></vuetable>
					<div class="pagination ui basic segment grid">
						<vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>

						<vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
					</div>
				</client-only>
			</card>
		</template>
		<div class="row">
			<div class="col p-4 text-center">
				<base-button class="active" @click.end="downloadCSV()">Download CSV</base-button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
export default {
	middleware: 'authenticated',
	layout: 'layout-tool',
	name: 'analytics-users',
	data() {
		return {
			population_data: 0,
			sortOrder: [
				{
					field: 'email',
					direction: 'asc'
				}
			],
			table_fields: [
				{ title: 'ID', name: 'id' },
				{ title: 'Role', name: 'role' },
				{ title: 'Created', name: 'created_at' }
				// { title: 'Login Count', name: 'logged_in_count' },
			],
			users: []
		};
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	components: {
		Vuetable,
		VuetablePagination,
		VuetablePaginationInfo
	},
	computed: {
		...mapState('auth', ['loggedIn', 'user'])
	},
	methods: {
		async getAllUserInfo() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.users = await this.$axios.$post(
				process.env.baseAPI + '/analytics/getalluserdata'
			);
			this.users = this.users.users;
		},

		async downloadCSV() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			var print_data = await this.$axios.$get(
				process.env.baseAPI + '/analytics/downloadcsv'
			);
			const url = window.URL.createObjectURL(
				new Blob([JSON.stringify(print_data)])
			);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'Example Data.txt');
			document.body.appendChild(link);
			link.click();
		},
		onPaginationData(paginationData) {
			this.$refs.pagination.setPaginationData(paginationData);
			this.$refs.paginationInfo.setPaginationData(paginationData);
		},
		onChangePage(page) {
			this.$refs.vuetable.changePage(page);
		}
	},
	mounted() {
		this.getAllUserInfo();
	}
};
</script>