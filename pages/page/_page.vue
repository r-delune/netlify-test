<template>
  <article>
    <!-- <transition name="slide-fade" mode="out-in"> -->
    <!-- Module Description Text -->
    <h1>{{page}} -</h1>
    <!-- Page Intro Text -->
    <div v-html="$md.render(page.introduction)" />
    <!-- Form Types -->
    <div v-for="(qs, i) in page.form" :key="i">
      <!-- Yes/No Question -->
      <div v-if="qs.type == 'binary'">
        found binar
        <binary :settings="qs" @selected="selected"></binary>
      </div>
      <!-- Slider Question -->
      <div v-if="qs.type == 'slider'">
        found slider
        <slider :settings="qs" @selected="selected"></slider>
      </div>
      <!-- Rank Question -->
      <div v-if="qs.type == 'rank'">
        found rank
        <rank :settings="qs" @selected="selected"></rank>
      </div>
      <!-- Choice Question -->
      <div v-if="qs.type == 'choice'">
        found choice
        <multiple-choice @selected="selected"></multiple-choice>
      </div>
      <!-- Custom Question -->
      <div v-if="qs.type == 'custom'">
        found custom
        <binary-select @selected="selected"></binary-select>
      </div>
    </div>
    <!-- Show Custom Component -->
    <div v-if="page_number.is_custom == true">
      found custom component
      <component :is="page.custom_component_id"></component>
    </div>
    <div class="text-center">
      <button @click="nextPage()">next</button>
    </div>
  </article>
</template>
<script>
// Input components
import Binary from '~/components/input/BinarySelect.vue'
import MultipleChoice from '~/components/input/MultipleChoice.vue'
import Slider from '~/components/input/Slider.vue'
import Rank from '~/components/input/Rank.vue'

// Custom components
import CustomExample from '~/components/custom/CustomExample.vue'

export default {
  data: () => ({
    page_number: 0,
    final_question: false,
    questions: [
      'Do you abuse more than one drug at a time?',
      'Are you always able to stop using drugs when you want to?',
      'Have you ever had blackouts or flashbacks as a result of drug use?'
    ]
  }),
  components: {
    Rank,
    Binary,
    Slider,
    MultipleChoice,
    CustomExample
  },
  methods: {
    nextPage() {
      var curr_page = this.page.id.replace('page-', '')
      curr_page++
      console.log('moving to page ' + '/page/page-' + curr_page)
      this.$router.push({ path: '/page/page-' + curr_page })
    },
    selected(answer) {
      console.log('Answer has recieved callback: ' + answer)
    }
  },
  async asyncData({ params, payload }) {
    console.log('async data')
    console.log(params)
    if (payload) return { page: payload }
    else
      return {
        page: await require(`~/assets/content/_pages/${params.page}.json`)
      }
  }
}
</script>