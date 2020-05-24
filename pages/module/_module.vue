<template>
  <transition name="slide-fade" mode="out-in">
    <article>
      <!-- Module Description Text -->
      <h1>{{page}} -</h1>
      <!-- Page Intro Text -->
      <div v-html="$md.render(page.introduction)" />
      <!-- Form Types -->
      <div v-for="(qs, i) in page.form" :key="i">
        <!-- Yes/No Question -->
        <div v-if="qs.type == 'binary'">
          <binary :settings="qs" @selected="selected"></binary>
        </div>
        <!-- Slider Question -->
        <div v-if="qs.type == 'slider'">
          <slider :settings="qs" @selected="selected"></slider>
        </div>
        <!-- Rank Question -->
        <div v-if="qs.type == 'rank'">
          <rank :settings="qs" @selected="selected"></rank>
        </div>
        <!-- Choice Question -->
        <div v-if="qs.type == 'choice'">
          <multiple-choice @selected="selected"></multiple-choice>
        </div>
        <!-- Custom Question -->
        <div v-if="qs.type == 'custom'">
          <!-- <binary-select @selected="selected"></binary-select> -->
        </div>
      </div>

      <!-- Show Custom Component -->
      <div v-if="page_number.is_custom == true">
        <component :is="moduler.page[this.page_number].custom_component_id"></component>
      </div>
      <div class="text-center">
        <button @click="nextPage(page+1)">next</button>
      </div>
    </article>
  </transition>
</template>
<script>
// Input components
import Binary from '~/components/input/BinarySelect.vue'
import MultipleChoice from '~/components/input/MultipleChoice.vue'
import Slider from '~/components/input/Slider.vue'

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
    Slider,
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