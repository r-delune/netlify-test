<template>                    
    <div class="card-body text-center">
        <div v-for="(item, i) in items" :key="i">
            <form action="">
                <div class="row">
                    <div class="col-6">
                        <label>{{ item.text }}</label>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="p-3" v-for="(label, x) in item.labels" :key="x">
                                <input  type="radio" :value="item.labels" v-model="selected[i]">
                                <label>{{ label }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: "multi-likert",
    data: () => ({
        selected: [],
    }),
    props: {
        items: Array,
    },
    watch: {
        // TODO: Likert unfinished
        selected: function (newVal, oldVal) {
            console.log('selected has changed ' + this.selected)
            this.$emit('selected', this.sliders)
        }
    }
}
</script>
<style scoped>
    .likert{
        padding:10px
    }
</style>
