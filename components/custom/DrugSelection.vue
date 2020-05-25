<template>
  <div class="row">
    <div class="col-6">
      <div class="text-center p-4 h-auto">
        <label>What drugs have you used?</label>
      </div>
      <div class="row d-flex justify-content-center">
        <multiple-choice :items="items" @selected="selected"></multiple-choice>
      </div>
    </div>
    <div class="col-6">
      <div class="text-center p-4 h-auto">
        <label>What drugs have you used most frequently?</label>
      </div>
      <div class="row d-flex justify-content-center">
        <multiple-choice-single :items="selected_items" @selected="selected_primary"></multiple-choice-single>
      </div>
    </div>
  </div>
</template>
<script>
import MultipleChoice from '~/components/input/MultipleChoice'
import MultipleChoiceSingle from '~/components/input/MultipleChoiceSingle'
export default {
  name: 'Primary Drug Selection',
  description: 'Primary Drug Selection',
  data: () => ({
    primary_drug: '',
    selected_items: []
  }),
  prop: {
    items: Array
  },
  components: {
    MultipleChoice,
    MultipleChoiceSingle
  },
  methods: {
    selected(selection) {
      console.log('selected drugs has been clicked' + selection)
      this.selected_items = selection
      this.$store.commit('profile/setSelectedDrugs', this.selected_items)
    },
    selected_primary(selected) {
      console.log('selected primary item' + selected)
      this.primary_drug = selected
      this.$emit('selected', selected)
      this.$store.commit('profile/setPrimaryDrug', this.primary_drug)
    }
  },
  beforeDestroy() {}
}
</script>