<template>
  <div class="card-body text-center">
    {{ settings.question_text }}
    <div class="btn-wrapper">
      <button tag="a" @click.end="select('Yes', 0)" size="sm">{{settings.yes_text}}</button>
      <button tag="a" @click.end="select('No', 1)" size="sm">{{settings.no_text}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'binary',
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