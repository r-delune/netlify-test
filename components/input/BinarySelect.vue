<template>
  <div class="card-body text-center">
    <div class="row justify-content-center align-items-center">
      <div class="btn-wrapper">
        <base-button
          tag="a"
          @click.end="select('Yes', 0)"
          :class="{'active': isClicked[0]}"
          size="sm"
        >Yes</base-button>
        <base-button
          tag="a"
          @click.end="select('No', 1)"
          :class="{'active': isClicked[1]}"
          size="sm"
        >No</base-button>
      </div>
    </div>
  </div>
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