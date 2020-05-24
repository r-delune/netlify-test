<template>
  <article>
    <h1>{{page.title}}</h1>
    <!-- <h1>{{page.list}}</h1>

    <h1>{{page.page[0].list[0].markdown}}</h1>
    <div v-html="$md.render(page.page[0].list[0].markdown)" />-->
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    console.log('async data')
    console.log(params)
    if (payload) return { page: payload }
    else
      return {
        page: await require(`~/assets/content/_pages/${params.page}.json`)
      }
  }
}
</script>