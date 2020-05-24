<template>  
    <div class="card-body">
        <div v-for="(question, i) in questions" :key="i">
            <div class="row justify-content-center align-items-center p-2">
                <div class="col-">
                    <badge type="primary" pill>
                       Q.{{ i + 1}}
                    </badge>
                </div>
                <div class="col-9">
                    <label>
                        {{ question }}
                    </label>
                </div>
                <div class="col-">
                    <div class="btn-wrapper">
                        <base-button
                            tag="a" 
                            type="default"
                            size="sm"
                            @click="select('Yes', i, question)" 
                            :class="{'active': isClickedYes[i]}"
                            >
                            Yes
                        </base-button>
                        <base-button 
                            type="default"
                            tag="a"
                            size="sm"
                            @click="select('No', i, question)" 
                            :class="{'active': isClickedNo[i]}">
                            No
                        </base-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "multi-binary-select",
    data: () => ({
        answers: [],
        completed: [],
        isClickedNo: [],
        isClickedYes: []
    }),
    props: {
        questions: Array
    },
    methods: {
        select (answer, index, question) {
            
            // Color selected elements
            if (answer == 'No') {
                this.$set(this.isClickedNo, index, !this.isClickedNo[index])
                this.$set(this.isClickedYes, index, this.isClickedYes[index])
            }
            else {
                this.$set(this.isClickedYes, index, !this.isClickedYes[index])
                this.$set(this.isClickedNo, index, this.isClickedNo[index])
            }
            
            this.answers[index] = {
                'answer': answer, 
                'question_no': index,
            }
            if (this.answers.length == this.questions.length && this.answers.includes(undefined) == false) {
                console.log('answered all questions  ' + index + ' - ' + answer)
                this.$emit('selected', this.answers)
            }
        }
    },
    beforeMount() {
        // set all values to false
        this.questions.forEach((item, index) => this.$set(this.isClickedNo, index, false))
        this.questions.forEach((item, index) => this.$set(this.isClickedYes, index, false))
    },
}
</script>