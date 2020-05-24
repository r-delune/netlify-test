<template>                    
    <div class="card-body text-center">
        <div v-for="(item, i) in items" :key="i">
            <label :for="item">{{ item }} </label>
            <base-slider :step="1" :id="item" v-model="sliders[i]"></base-slider>
        </div>
    </div>
</template>
<script>
export default {
    name: "multi-slider",
    data: () => ({
        sliders: []
    }),
    props: {
        items: Object,
    },
    watch: {
        sliders: function (newVal, oldVal) {
            console.log('sliders has changed ' + this.sliders)
            this.$emit('selected', this.sliders)
        }
    },
}
</script>
<style scoped>
    .slider-label {
        font-size: 10px;
        display: table;
    }
</style>