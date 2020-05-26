<template>
	<div id="app">
		<div class="col">
			<div class="row justify-content-center">
				<div class="col-lg-10 pt-lg">
					<header class="header-global">
						<header></header>
					</header>
					<main id="page-wrap" class="flex-fill position-relative">
						<nuxt />
					</main>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import { Reveal } from 'vue-burger-menu';
import { mapState } from 'vuex';

let pwaPrompt;

export default {
	components: {
		Header,
		Footer,
		Reveal,
	},
	computed: {
		menu_items() {
			const items = [];
			if (this.user && this.user.role == 'admin') {
				items.push(
					{
						icon: faHeart,
						title: 'Profile',
						to: '/tool/profile',
						color: 'green',
					},
					{
						icon: faUserFriends,
						title: 'Analytics',
						to: '/tool/analytics/analytics-overview',
						color: 'green',
					},
					{
						icon: faUserFriends,
						title: 'Privacy',
						to: '/tool/privacy',
						color: 'green',
					}
				);
			} else {
				items.push(
					{
						icon: faBullseye,
						title: 'Activities',
						to: '/tool',
						color: 'green',
					},
					{
						icon: faUserFriends,
						title: 'Privacy',
						to: '/tool/privacy',
						color: 'green',
					}
				);
			}
			return items;
		},
		...mapState('auth', ['user']),
	},
	methods: {
		// prompt will inform the user that PWA is available
		doPrompt() {
			pwaPrompt.prompt();
			pwaPrompt.userChoice.then(function(choiceResult) {
				pwaPrompt = null;
			});
		},
		// logout the current user
		async logout() {
			var self = this;
			this.$axios.setToken(this.user.access_token, 'Bearer');
			this.$auth
				.logout()
				.then(result => {
					this.$toast.success('Logged out!');
					this.$router.push({ path: 'landing' });
				})
				.catch(err => {
					this.$toast.error('Logout Error: ' + err);
				});
		},
	},
	mounted() {
		this.$nextTick(() => {
			const pwaBtn = document.querySelector('#pwa-button');
			window.addEventListener('beforeinstallprompt', function(e) {
				console.log('before install promt');
				e.preventDefault();
				pwaPrompt = e;
				showBtn();
			});
			function showBtn() {
				console.log('showing PWA button');
				pwaBtn.style.display = 'block';
			}
		});
	},
};
</script>
<style>
.bm-burger-button {
	z-index: 999;
}

body,
#app {
	min-height: 100vh;
}

.text-nowrap {
	white-space: nowrap;
}

.username {
	padding: 10px;
}
</style>
