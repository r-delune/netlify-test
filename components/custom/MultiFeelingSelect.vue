<template>  
    <div class="card-body">
        <div v-for="(question, i) in questions" :key="i">
            <div class="row justify-content-center align-items-center p-1">           
                <div class="col-1">
                    <badge type="primary" pill>
                       Q.{{ i + 1}}
                    </badge>
                </div>
                <label class="col-6 p-2">
                {{ question }}
                </label>  
                <div class="col- p-1">
                    <base-button
                        size="sm"
                        @click.end="select('Approve', i, 0)"
                        :class="{'active': isClickedApprove[i]}"
                        >
                        Approve
                    </base-button>
                </div>
                <div class="col- p-1">
                    <base-button 
                        size="sm"
                        @click.end="select('Disapprove', i, 1)"
                        :class="{'active': isClickedDisapprove[i]}"
                    >
                        Disapprove
                    </base-button>
                </div>
                <div class="col- p-1">
                    <base-button 
                        size="sm"
                        @click.end="select('Wouldn\'t Care', i, 2)"
                        :class="{'active': isClickedCareless[i]}"
                    >
                        Wouldn't Care
                    </base-button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "multi-feeling-select",
    data: () => ({
        selected: [],
        completed: [],
        isClickedApprove: [],
        isClickedDisapprove: [],
        isClickedCareless: []
    }),
    props: {
        questions: Array
    },
    methods: {
        select (answer, index, points) {
            console.log('inner selecteded answers no  ' + index + ' - ' + answer)
            //this.$set(this.isClickedNo, index, !this.isClickedNo[index])
            if (answer == 'Disapprove') {
                this.$set(this.isClickedDisapprove, index, !this.isClickedDisapprove[index])
            }
            else if (answer == 'Wouldn\'t Care') {
                this.$set(this.isClickedCareless, index, !this.isClickedCareless[index])
            }else {
                this.$set(this.isClickedApprove, index, !this.isClickedApprove[index])
            }
            
            this.selected[index] = {
                'answer': answer, 
                'question_no': index,
                'points': points,
            }

            if (this.selected.length == this.questions.length) {
                console.log('answered all questions  ' + index + ' - ' + answer)
                this.$emit('selected', this.selected)
            }
        }
    },
    beforeMount() {
        // set all values to false
        this.questions.forEach((item, index) => this.$set(this.isClickedApprove, index, false))
        this.questions.forEach((item, index) => this.$set(this.isClickedDisapprove, index, false))
        this.questions.forEach((item, index) => this.$set(this.isClickedCareless, index, false))
    },
}
</script>
<style>
    .active {
        color: white
    }
</style>