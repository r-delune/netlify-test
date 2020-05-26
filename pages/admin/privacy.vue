<template>
	<div>
		<card type="secondary" shadow>
			<div class="col text-wrap">
				<h1>Privacy, Safety and Security</h1>
				<h4>Our Promises</h4>
				<p>We never sell your data or student data. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<h4>We don't own your content</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<h4>We use the latest security practices</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				<h4>We are fully GDPR compliant</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
		</card>
	</div>
</template>
<script>
export default {
	name: 'privacy',
	middleware: 'authenticated',
	layout: 'layout-tool'
};
</script>