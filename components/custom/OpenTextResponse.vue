<template>  
    <div>
        <div v-for="(question, i) in questions" :key="i">
            <div class="row align-items-center">
                <div class="col-3"></div>
                <div class="col- p-2">
                    {{ question }}
                </div>
                <div class="col">
                    <input v-model='answers[i]'>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "open-text-response",
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
<style >
    .questions {
        display: flex;
        align-items: center;
    }
</style>