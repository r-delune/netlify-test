<template>                    
    <div class="m-4">
        <div v-for="(item, i) in items" :key="i">
            <input :id="item.slug" :value="item" type="checkbox" v-model="checkedNames[i]"/>
            <label class='p-1' :for="item">{{ item }} </label>
        </div>
    </div>
</template>
<script>
export default {
    name: "multiple-choice-indexed",
    data: () => ({
        checkedNames: []
    }),
    props: {
        items: Array
    },
    watch: {
        checkedNames: function (newVal, oldVal) {
            console.log('checked names has changed ' + this.checkedNames)
            this.$emit('selected_indexes', this.checkedNames)
        }
    }
}
</script>