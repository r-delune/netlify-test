<template>
  <footer>MyUSE team - Footer {{year}}</footer>
</template>
<script>
export default {
  name: 'tool-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
</style>
