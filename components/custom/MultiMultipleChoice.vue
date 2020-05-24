<template>                    
    <div>   
        <div v-for="(question_item, x) in queations_array" :key="x" class="col-8">
            <div class="row">
                {{ question_item.question }}
            </div>  
            <div class="p-4">
                <div v-for="(item, i) in question_item.questions" :key="i">
                    <input type="checkbox" :value="item" :id="item" v-model="checkedNames[x][i]"/>
                    <label class='p-2' :for="item">{{ item }} </label>
                </div>
            </div>   
        </div>  
    </div>
</template>
<script>

export default {
    name: "multi-multiple-choice",
    data: () => ({
        checkedNames: []
    }),
    props: {
        items: Array
    },
    watch: {
        checkedNames: function (newVal, oldVal) {
            console.log('checked names has changed ' + this.checkedNames)
            if (this.checkedNames.length >= items.length){
                console.log('all checked names have been answered' + this.checkedNames)
                this.$emit('selected', this.checkedNames)
            }        
        }
    },
}
</script>