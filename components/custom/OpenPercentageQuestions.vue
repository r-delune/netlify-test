<template>  
    <div class="card-body mx-3">
        <div class="row d-flex justify-content-center"  v-for="(question, i) in questions" :key="i">
            <label class="col-7 p-1">
                {{ question }}
            </label>
            <div class="col-3">
                <form>
                    <input type="number" min="0" :max="100" maxlength="100" OpenPercentageQuestions v-model='answers[i]' required> %
                </form>
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