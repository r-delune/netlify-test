<template>
  <transition name="slide-fade" mode="out-in">
    <article>
      <!-- Module Description Text -->
      <h1>{{page}} -</h1>
      <!-- <h1>{{moduler.page}} -</h1> -->
      <!-- <h1>Page Count {{this.moduler.page[this.page_number].length}}</h1> -->
      <!-- Page Intro Text -->
      <div v-html="$md.render(moduler.page[this.page_number].introduction)" />
      <!-- Form Types -->
      <div v-if="moduler.page[this.page_number].form.length > 0">
        <!-- Yes/No Question -->
        <div v-if="moduler.page[this.page_number].form.type == 'binary'">
          <binary :settings="moduler.page[this.page_number].form[0]" @selected="selected"></binary>
        </div>
        <!-- Slider Question -->
        <div v-if="moduler.page[this.page_number].form[0].type == 'slider'">
          <!-- <slider @selected="selected"></slider> -->
        </div>
        <!-- Rank Question -->
        <div v-if="moduler.page[this.page_number].form[0].type == 'rank'">
          <!-- <rank @selected="selected"></rank> -->
        </div>
        <!-- Choice Question -->
        <div v-if="moduler.page[this.page_number].form[0].type == 'choice'">
          <multiple-choice @selected="selected"></multiple-choice>
        </div>
        <!-- Custom Question -->
        <div v-if="moduler.page[this.page_number].form[0].type == 'custom'">
          <!-- <binary-select @selected="selected"></binary-select> -->
        </div>
        <div class="text-center">
          <button @click="nextPage(page+1)">next</button>
        </div>
      </div>
      <!-- Show Custom Component -->
      <div v-if="moduler.page[this.page_number].is_custom == true">
        <component class="p-4" :is="moduler.page[this.page_number].custom_component_id"></component>
      </div>
    </article>
  </transition>
</template>
<script>
// Input components
import Binary from '~/components/input/BinarySelect.vue'
import MultipleChoice from '~/components/input/MultipleChoice.vue'

// Custom components
import CustomExample from '~/components/custom/CustomExample.vue'

export default {
  data: () => ({
    page_number: 0,
    questions: [
      'Do you abuse more than one drug at a time?',
      'Are you always able to stop using drugs when you want to?',
      'Have you ever had blackouts or flashbacks as a result of drug use?'
    ]
  }),
  computed: {
    page() {
      return this.moduler.page[this.page_number]
    }
  },
  components: {
    Binary,
    MultipleChoice,
    CustomExample
  },
  methods: {
    nextPage() {
      console.log('moving to next page')
      this.page_number++
    },
    methods: {
      selected(answer) {
        console.log('Answer has recieved callback: ' + answer)
      }
    }
  },
  async asyncData({ params, payload }) {
    console.log('async data')
    console.log(params)
    if (payload) return { module: payload }
    else
      return {
        moduler: await require(`~/assets/content/_modules/${params.module}.json`)
      }
  }
}
</script>