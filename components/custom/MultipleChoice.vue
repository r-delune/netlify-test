<template>                    
    <div class="p-1">
        <div v-for="(item, i) in items" :key="i">
            <span>
                <input :id="item.slug" :value="item" type="checkbox" v-model="checkedNames"/>
                <label class='p-1' :for="item">{{ item }} </label>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "multiple-choice",
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