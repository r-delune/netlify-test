<template>
  <article>
    <h1>{{moduler.title}}</h1>
    <h1>Page Count {{moduler.page.length}}</h1>
    <h1>{{moduler.page[page]}}</h1>
    <div v-html="$md.render(moduler.page[page].list[0].markdown)" />
    <div class="text-center">
      <button @click="nextPage(page+1)">next</button>
    </div>
  </article>
</template>
<script>
export default {
  data: () => ({
    page_number: 0
  }),
  computed: {
    page() {
      return this.page_number
    }
  },
  methods: {
    nextPage() {
      console.log('moving to next page')
      this.page_number++
    }
  },
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