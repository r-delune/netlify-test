<template>                    
    <div class="m-4">
        <div v-for="(item, i) in items" :key="i">
            <input :id="item.slug" :value="item" type="radio" v-model="checkedNames"/>
            <label class='p-1' :for="item">{{ item }} </label>
        </div>
    </div>
</template>
<script>
export default {
    name: "multiple-choice-single",
    data: () => ({
        checkedNames: []
    }),
    props: {
        items: Array
    },
    watch: {
        checkedNames: function (newVal, oldVal) {
            console.log('checked names has changed ' + this.checkedNames)
            this.$emit('selected', this.checkedNames)
        }
    }
}
</script>