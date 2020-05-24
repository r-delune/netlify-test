<template>
  <article>
    <h1>{{moduler.title}}</h1>
    <h1>{{moduler}}</h1>

    <h1>{{moduler.page}}</h1>
    <div v-html="$md.render(moduler.page[0].list[0].markdown)" />
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    console.log('async data')
    console.log(params)
    if (payload) return { module: payload }
    else
      return {
        moduler: await require(`~/assets/content/_modules/${params.module}.json`)
      }
  }
}
</script>