<template>
  <div class="row pt-4">
    <div class="col-7">
      <label>{{settings.text}}</label>
    </div>
    <div class="col- m-auto">
      <div class="slider-label">{{ settings.low_label }}</div>
    </div>
    <div class="col-2">
      <base-slider
        @input="changedSliders()"
        v-model="sliders.slider1"
        :range="{min: 1, max: settings.range}"
      ></base-slider>
    </div>
    <div class="col- m-auto">
      <div class="slider-label">{{settings.high_label }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slider',
  data: () => ({
    sliders: {
      slider1: 0
    }
  }),
  props: {
    settings: Object
  },
  methods: {
    changedSliders() {
      this.$emit('selected', sliders.slider1)
      console.log('changed sliders')
    }
  }
}
</script>