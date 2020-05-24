<template>
  <article>
    <!-- Module Description Text -->
    <h1>{{moduler.title}} - Page Count {{moduler.page.length}}</h1>
    <!-- Page Intro Text -->
    <div v-html="$md.render(moduler.page[page].text)" />
    <!-- Form Types -->
    <div v-if="page.form.length > 0">
      <!-- Yes/No Question -->
      <div v-if="page.form.type == 'binary'">
        <binary-select @selected="selected"></binary-select>
      </div>
      <!-- Slider Question -->
      <div v-if="page.form.type == 'slider'">
        <binary-select @selected="selected"></binary-select>
      </div>
      <!-- Rank Question -->
      <div v-if="page.form.type == 'rank'">
        <binary-select @selected="selected"></binary-select>
      </div>
      <!-- Choice Question -->
      <div v-if="page.form.type == 'choice'">
        <binary-select @selected="selected"></binary-select>
      </div>
      <!-- Custom Question -->
      <div v-if="page.form.type == 'custom'">
        <binary-select @selected="selected"></binary-select>
      </div>
      <div class="text-center">
        <button @click="nextPage(page+1)">next</button>
      </div>
    </div>
    <div v-if="page.form.is_custom == true"></div>
  </article>
</template>
<script>
import BinarySelect from '~/components/custom/BinarySelect'
import MultipleChoice from '~/components/custom/MultipleChoice'
import MultipleChoiceSingle from '~/components/custom/MultipleChoiceSingle'
import MultiBinarySelect from '~/components/custom/MultiBinarySelect'
import BinarySelect from '~/components/custom/BinarySelect'
import BinarySelect from '~/components/custom/BinarySelect'
import BinarySelect from '~/components/custom/BinarySelect'

export default {
  data: () => ({
    page_number: 0
  }),
  computed: {
    page() {
      return moduler.page[this.page_number]
    }
  },
  components: {
    BinarySelect
  },
  methods: {
    nextPage() {
      console.log('moving to next page')
      this.page_number++
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