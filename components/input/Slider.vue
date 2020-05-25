<template>
  <div class="row pt-4">
    <div class="col-7">
      <label>{{settings.text}}</label>
    </div>
    <div class="col- m-auto">
      <div class="slider-label">{{ settings.low_label }}</div>
    </div>
    <div class="col-2">
      <!-- <base-slider
        @input="changedSliders()"
        v-model="sliders.slider1"
        :range="{min: 1, max: settings.range}"
      ></base-slider>-->
      <range-slider
        @input="changedSliders()"
        class="slider"
        min="10"
        max="1000"
        step="10"
        v-model="sliderValue"
      ></range-slider>
    </div>
    <div class="col- m-auto">
      <div class="slider-label">{{settings.high_label }}</div>
    </div>
  </div>
</template>
<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'slider',
  data: () => ({
    sliderValue: 50,
    sliders: {
      slider1: 0
    }
  }),
  props: {
    settings: Object
  },
  components: {
    RangeSlider
  },
  methods: {
    changedSliders() {
      this.$emit('selected', this.sliderValue)
    }
  }
}
</script>
<style>
.slider {
  /* overwrite slider styles */
  width: 200px;
}
</style> 