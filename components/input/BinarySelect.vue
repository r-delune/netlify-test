<template>
  <div class="card-body text-center">
    <div class="row justify-content-center align-items-center">
      {{ settings.question_text }}
      <div class="btn-wrapper">
        <base-button tag="a" @click.end="select('Yes', 0)" size="sm">{{settings.yes_text}}</base-button>
        <base-button tag="a" @click.end="select('No', 1)" size="sm">{{settings.no_text}}</base-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'binary-select',
  data: () => ({
    selected_items: []
  }),
  props: {
    settings: Object
  },
  methods: {
    select(item, index) {
      this.$emit('selected', item)
    }
  }
}
</script>