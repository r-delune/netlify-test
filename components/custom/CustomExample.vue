<template>
  <div class="card-body text-center">You are seeing a custom component</div>
</template>
<script>
export default {
  name: 'binary-select',
  data: () => ({
    selected_items: [],
    isClicked: [0, 0]
  }),
  props: {
    items: Array
  },
  methods: {
    select(item, index) {
      this.$set(this.isClicked, index, this.isClicked[index])

      if (index == 0) {
        this.$set(this.isClicked, 0, !this.isClicked[0])
        //this.$set(this.isClicked, 0, !this.isClicked[1])
      } else {
        this.$set(this.isClicked, 1, !this.isClicked[1])
        //this.$set(this.isClicked, 0, this.isClicked[0])
      }

      console.log('inner selected answer ' + item)
      this.$emit('selected', item)
    }
  }
}
</script>
<style scoped>
.active {
  color: white;
}
</style>