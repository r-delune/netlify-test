<template>
  <div>
    <ul v-for="(m, index) in modules" :key="index">
      <nuxt-link :to="`/${m.title}`">{{m.title}}</nuxt-link>
      <p>{{m.page}}</p>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    modules() {
      return this.$store.state.modules
    }
  }
}
</script>