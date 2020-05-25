<template>
  <article>
    This page {{ current_page}} -
    Next page {{ next_page}}
    Next page {{ page}}
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
      <!-- Open Question -->
      <div v-if="qs.type == 'open'">
        <textarea :settings="qs" @selected="selected" placeholder="qs.type.text"></textarea>
      </div>
      <!-- Rank Question -->
      <div v-if="qs.type == 'rank'">
        <rank :settings="qs" @selected="selected"></rank>
      </div>
      <!-- Choice Question -->
      <div v-if="qs.type == 'choice'">
        <multiple-choice :settings="qs" @selected="selected"></multiple-choice>
      </div>
      <!-- Custom Component -->
      <div v-if="qs.type == 'custom'">
        <component :is="qs.custom_component_id" :settings="qs" @selected="selected"></component>
      </div>
    </div>
    <form role="form" class="text-center">
      <button
        :style="{visibility: is_completed ? 'visible' : 'hidden'}"
        type="button"
        class="btn btn-primary btn-sm"
        @click="moveToNextPage()"
      >Continue</button>
      <button
        v-if="this.page.final == true"
        :style="{visibility: is_completed ? 'visible' : 'hidden'}"
        type="button"
        class="btn btn-primary btn-sm"
        @click="returnToMenu()"
      >Menu</button>
      <button
        v-if="this.page.final == true"
        :style="{visibility: is_completed ? 'visible' : 'hidden'}"
        type="button"
        class="btn btn-primary btn-sm"
        @click="storeCode()"
      >Store Login Code</button>
    </form>
  </article>
</template>
<script>
import { mapMutations } from 'vuex'

// Input components
import Binary from '~/components/input/Binary.vue'
import MultipleChoice from '~/components/input/MultipleChoice.vue'
import Slider from '~/components/input/Slider.vue'
import Rank from '~/components/input/Rank.vue'

// Custom components
import CustomExample from '~/components/custom/CustomExample.vue'
import DrugsQuiz from '~/components/custom/DrugsQuiz.vue'

export default {
  data: () => ({
    show_next_page_button: false,
    answers: []
  }),
  components: {
    Rank,
    Binary,
    DrugsQuiz: DrugsQuiz,
    Slider,
    MultipleChoice,
    CustomExample
  },
  computed: {
    next_page() {
      return this.$store.getters['navigation/getNextPage']
    },
    current_page() {
      return this.$store.getters['navigation/getCurrentPage']
    },
    is_completed() {
      if (this.show_next_page_button == true) {
        this.completed(true)
        return true
      }

      // set completed if no input required
      if (this.page.form.length == 0) {
        this.completed(true)
        return true
      }
    }
  },
  methods: {
    // move to the next page
    moveToNextPage() {
      console.log('moving to page ' + this.next_page)
      this.$router.push({ path: '/page/' + this.next_page })
      this.storeData()
    },
    // move the user back to the menu
    returnToMenu() {
      this.storeData()
      this.$router.push({ path: '/' })
    },
    completed(status) {
      console.log('completed has been marked')
      console.log(this.page)
      console.log(this.answers)
      this.show_next_page_button = status
      this.$store.dispatch('navigation/determineNextPage', {
        page: this.page,
        answers: this.answers
      })
    },
    // callback from user input
    selected(answer) {
      console.log('Answer has recieved callback: ' + answer)
      // Only set to true if page has completed requirements
      if ('limit' in this.page) {
        if (answer.length > page.limit) {
          this.completed(true)
        }
      } else {
        // otherwise do not show next button
        this.completed(true)
      }

      this.answers.push(answer)
    },
    // store data after page completion
    storeData() {
      this.$store.commit('profile/storePageData', {
        page: this.page,
        answers: this.answers
      })
    },
    // copy user passcode to clipboard and download to file
    storeCode() {
      // this.$store.commit('profile/storeCode', this)
      this.$copyText(this.user.password)
      const url = window.URL.createObjectURL(new Blob([this.user.password]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'MyUSE Password.txt')
      document.body.appendChild(link)
      link.click()
    }
  },
  // render this page dynamically on build
  async asyncData({ params, payload }) {
    if (payload) return { page: payload }
    else
      return {
        page: await require(`~/assets/content/_pages/${params.page}.json`)
      }
  },
  mounted() {
    console.log('mounted')
    console.log(this.page)
    this.$store.dispatch('navigation/setCurrentPage', this.page.title)
  }
}
</script>