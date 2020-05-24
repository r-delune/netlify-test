<template>  
    <div>
        <div class="row justify-content-center" v-for="(question, i) in questions" :key="i">
            <label class="col-9 p-1">
                {{ question }}
            </label>
            <div class="col-3">
                <input type="number" min="0" max="100" v-model='answers[i]'> %
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "open-percentage-questions",
    data: () => ({
        answers: [],
        completed: []
    }),
    props: {
        questions: Array
    },
    watch: {
        answers: function (val) {
            if (this.answers.length == this.questions.length) {
                console.log('answered all questions  ' + this.answers)
                this.$emit('selected', this.answers)
            }    
        }
    }
}
</script>