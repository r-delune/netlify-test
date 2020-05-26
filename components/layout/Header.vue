<template>
	<div>
		<!-- <base-nav class="navbar-main" transparent type effect="light" expand>-->

		<ul>
			<button v-if="this.$route.path.includes(innerModule) == true" slot="title" type="primary">
				<nuxt-link class="text-white" :to="'/tool/'">Back</nuxt-link>
			</button>
			<button v-if="this.$route.path == moduleMenu" slot="title" type="primary">
				<nuxt-link class="text-white" :to="'/'">Home</nuxt-link>
			</button>
			<ul>
				<a @click.stop="storeCode()">Store Code</a>
				<a @click.stop="logout()">Logout {{user.role}}</a>
			</ul>
		</ul>
		<!-- </base-nav> -->
	</div>
	<!-- <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto sm-auto">
                <base-button v-if="this.$route.path.includes(innerModule) == true" slot="title" type="primary">
                    <nuxt-link class="text-white" :to="'/tool/'">
                        Back
                    </nuxt-link>
                </base-button>
                <base-button v-if="this.$route.path == moduleMenu" slot="title" type="primary">
                    <nuxt-link class="text-white" :to="'/'">
                        Home
                    </nuxt-link>
                </base-button>
                <base-dropdown>
                    <base-button slot="title" type="primary" class="dropdown-toggle">
                        <span class="btn-inner--icon">
                            <i class="fa fa-cog mr-2"></i>
                        </span>
                        Options
                    </base-button>
                    <a class="dropdown-item" @click.stop="storeCode()">Store Code</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click.stop="logout()">Logout {{user.role}}</a>
                </base-dropdown>
            </ul>
        </base-nav>
	</header>-->
</template>
<script>
// import BaseNav from '~/components/argon_custom/BaseNav'
// import BaseDropdown from '~/components/argon_custom/BaseDropdown'
// import CloseButton from '~/components/argon_custom/CloseButton'
import { mapState } from 'vuex';
export default {
	//   components: {
	//     BaseNav,
	//     CloseButton,
	//     BaseDropdown
	//   },
	data() {
		return {
			//   moduleMenu: '/tool',
			//   innerModule: '/module'
		};
	},
	computed: {
		current_module() {
			this.$store.getters['navigation/getCurrentModule'];
		},
		// ...mapState('auth', ['loggedIn', 'user']),
	},
	methods: {
		// logout the current user
		async logout() {
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.$auth
				.logout()
				.then(result => {
					this.$toast.success('Logged out!');
					this.$router.push('/tool/landing');
				})
				.catch(err => {
					this.$toast.error('Logout Error: ' + err);
				});
		},
		// copy user passcode to clipboard and download to file
		storeCode() {
			this.$copyText(this.user.password);
			const url = window.URL.createObjectURL(new Blob([this.user.password]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'MyUSE Password.txt');
			document.body.appendChild(link);
			link.click();
		},
	},
};
</script>