<template>
  <div class="p-1">
    <div v-for="(list_item, i) in settings.list" :key="i">
      <span>
        <input :id="list_item.item" :value="list_item.item" type="checkbox" v-model="checkedNames" />
        <label class="p-1" :for="list_item.item">{{ list_item.item }}</label>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'multiple-choice',
  data: () => ({
    checkedNames: []
  }),
  props: {
    settings: Object
  },
  watch: {
    checkedNames: function(newVal, oldVal) {
      console.log('checked names has changed ' + this.checkedNames)
      this.$emit('selected', this.checkedNames)
    }
  }
}
</script>