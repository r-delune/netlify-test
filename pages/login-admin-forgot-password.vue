<template>
	<card class="p-5">
		<img src="~/assets/images/icon.png" class="text-center image" />
		<form role="form" class="px-5 m-5">
			<base-input
				class="mb-5"
				v-model="email"
				placeholder="Your Email"
				addon-left-icon="ni ni-email-83"
			></base-input>
			<div class="text-center">
				<base-button type="primary" class="my-4">Remind Me</base-button>
			</div>
			<nuxt-link to="/tool/login-admin">
				<a href="#" class="text-light text-center">
					<small>Back</small>
				</a>
			</nuxt-link>
		</form>
	</card>
</template>
<script>
export default {
	name: 'login-admin-forgot-password',
	layout: 'layout-tool',
	data() {
		return {
			email: '',
		};
	},
	methods: {
		async forgotPasswordEmail() {
			console.log('TODO: email verification.forgot password email');
		},
	},
};
</script>
<style scoped>
.image {
	width: 0px 170px;
}
</style>