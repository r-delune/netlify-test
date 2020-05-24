<template>
  <div>
    <ul v-for="(m, index) in pages" :key="index">
      <nuxt-link :to="`/page/${m.title}`">{{m.title}}</nuxt-link>
      <!-- <p>{{m.page}}</p> -->
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>