<template>
  <div class="row p-3">
    <div class="col">
      <div class="row d-flex justify-content-center min-vw-350">
        <multiple-choice :items.sync="settings.items" @selected="selected"></multiple-choice>
      </div>
    </div>
    <div class="col">
      <div class="row d-flex justify-content-center min-vw-350">
        <draggable v-model="selected_items" @end="dragEnd">
          <div v-for="(item, i) in selected_items" :key="item" class="row d-flex p-3">
            <badge type="primary" pill>{{ i + 1 }} - {{item}}</badge>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import MultipleChoice from '~/components/input/MultipleChoice.vue'
export default {
  name: 'rank',
  data: () => ({
    selected_items: [],
    rankList: [],
    array: []
  }),
  props: {
    settings: Object
  },
  components: {
    MultipleChoice
  },
  methods: {
    selected(selection) {
      console.log('selected drugs has been clicked - ' + selection)
      this.selected_items = selection
      var self = this
      var final = []

      this.selected_items.forEach(function(item, index) {
        let selected = {}
        selected.id = self.items.indexOf(item)
        selected.text = item
        final[index] = selected
      })

      if (
        this.selected_items.length > 0 &&
        this.selected_items.length <= this.limit
      ) {
        this.$emit('selected', final)
      } else {
        this.$emit('selected', [])
      }
    },
    dragEnd() {
      console.log(this.selected_items)
    }
  }
}
</script>