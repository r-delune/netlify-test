<template>
  <article>
    <h1>{{blogPost.title}}</h1>
    <div v-html="$md.render(blogPost.body)" />
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { pageData: payload }
    else
      return {
        pageData: await require(`~/assets/content/page/${params.page}.json`)
      }
  }
}
</script>