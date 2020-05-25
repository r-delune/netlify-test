<template>
  <article>
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
        <multiple-choice :settings="qs" @selected="selected"></multiple-choice>
      </div>
      <!-- Custom Question -->
      <div v-if="qs.type == 'custom'">
        <component :is="page.custom_input_id" :settings="qs" @selected="selected"></component>
      </div>
    </div>
    <!-- Show Custom Component -->
    <div v-if="page.is_custom_component == true">
      <component :is="page.custom_component_id" :items="page.page"></component>
    </div>
    <div v-if="is_completed" class="text-center">
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
    limit: 0,
    show_next: false
  }),
  components: {
    Rank,
    Binary,
    Slider,
    MultipleChoice,
    CustomExample
  },
  computed: {
    is_completed() {
      if (this.show_next == true) {
        return true
      }

      // set page as completed if there are no forms
      if (this.page.form.length > 0) {
        return false
      }
    }
  },
  methods: {
    nextPage() {
      console.log('PAGE')
      console.log(this.page)

      if (this.page.final == true) {
        console.log('reached final page')
        this.$router.push({ path: '/' })
      } else {
        var curr_page = this.page.id.replace('1.', '')
        curr_page++
        console.log('moving to page ' + '/page/1.' + curr_page)
        this.$router.push({ path: '/page/1.' + curr_page })
      }
    },
    selected(answer) {
      console.log('Answer has recieved callback: ' + answer)

      // Only set to true if page has completed requirements
      if ('limit' in this.page) {
        if (answer.length > page.limit) {
          this.show_next = true
        }
      } else {
        this.show_next = true
      }
    }
  },
  async asyncData({ params, payload }) {
    if (payload) return { page: payload }
    else
      return {
        page: await require(`~/assets/content/_pages/${params.page}.json`)
      }
  }
}
</script>