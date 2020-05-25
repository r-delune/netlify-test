<template>
  <div>
    <div v-for="(question, i) in quiz_questions" :key="i">
      <div class="row question p-2 m-auto">
        <div class="col-">
          <badge type="primary m-auto mx-4" pill>{{ i + 1}}</badge>
        </div>
        <div class="col-6">
          <label>{{ question.text }}</label>
          <div v-if="question.type == 'Binary'">
            <div class="btn-wrapper p-3">
              <base-button
                tag="a"
                size="sm"
                :class="{'active': isClicked[question+''+i+'']}"
                @click.end="select('Yes', i, question)"
              >Yes</base-button>
              <base-button
                tag="a"
                @click.end="select('No', i, question)"
                :class="{'active': isClicked[question+''+i+'']}"
                size="sm"
              >No</base-button>
            </div>
          </div>
          <div v-else class="p-2">
            <div class="p-2" v-for="(answer, x) in question.questions" :key="x">
              <input
                :id="answer.slug"
                :value="answer"
                :name="'groups_' + i"
                type="radio"
                @click.end="select(x, i, question)"
              />
              <small class="p-1" :for="answer">{{ answer }}</small>
            </div>
          </div>
        </div>
        <div class="col-5 p-3 mh-200 card-header" v-if="quiz_questions[i].visible">
          <div v-if="answers[i] == true">
            <label>
              <small>{{ quiz_questions[i].correct_feedback}}</small>
            </label>
          </div>
          <div v-else>
            <label>
              <small>
                <i>{{ quiz_questions[i].incorrect_feedback}}</i>
              </small>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DrugsQuiz',
  description: 'Quiz',
  data: () => ({
    answers: [],
    completed: true,
    isClickedYes: [],
    isClickedNo: [],
    isClicked: [],
    quiz_score: 0,
    quiz_questions: [
      {
        id: 1,
        visible: false,
        answer: 'No',
        type: 'Binary',
        text: 'Is it illegal to have drugs in your system?',
        correct_feedback:
          'You ‘ve got it! It is not against the Irish law to have drugs in your system. Some medical prescriptions can be potent drugs and there are still prescribed for therapeutic purposes and under medical supervision. This does not mean you may try having some in your system. All drugs, legal and especially illegal have risk that may harm you. ',
        incorrect_feedback:
          'This is incorrect. It is not against the Irish law to have drugs in your system. Some medical prescriptions can be potent drugs and there are still prescribed for therapeutic purposes and under medical supervision. This does not mean you may try having some in your system. All drugs, legal and especially illegal have risk that may harm you. ',
        points: [0, 1] //First True, second False
      },
      {
        id: 2,
        visible: false,
        answer: 3,
        type: 'MCQ',
        text: "What's the primary reason students do not use drugs?",
        questions: [
          'Concerns about possible effects of drugs on thinking',
          'Concerns about psychological impact',
          'Concerns about legal implications of drug use',
          'Never expressed an interest'
        ],
        correct_feedback:
          'Correct! When students who have never used were asked about their primary motivation for never use, the majority said that the reason for never using drugs was lack of interest. Other reasons for never use were concerns about the effects of drugs in thinking and decision making, in mood and energy or well-being and even legal implications- all true and possible to occur. It’s your decision then!',
        incorrect_feedback:
          'This is incorrect. When students who have never used were asked about their primary motivation for never use, the majority said that the reason for never using drugs was lack of interest. Other reasons for never use were concerns about the effects of drugs in thinking and decision making, in mood and energy or well-being and even legal implications- all true and possible to occur. It’s your decision then!',
        points: [0, 0, 0, 1] // First True, second not true
      },
      {
        id: 3,
        visible: false,
        answer: 'Yes',
        type: 'Binary',
        text:
          'Students who do not use drugs can be influenced by students who do, to use drugs as well?',
        correct_feedback:
          'Correct! Mind you! It is highly likely for students who do not use to be influenced from others who take drugs to try or experiment. This is something very common among university students as drugs become more and more “a passage of ride”. It is up to you to decide whether you want to put yourself into risk, even one use can harm you.',
        incorrect_feedback:
          'Incorrect! Context does matter! Mind you! It is highly likely for students who do not use to be influenced from others who take drugs to try or experiment. This is something very common among university students as drugs become more and more “a passage of ride”. It is up to you to decide whether you want to put yourself into risk, even one use can harm you.',
        points: [1, 0] //First True, second False
      },
      {
        id: 4,
        visible: false,
        answer: 2,
        text: 'How much is the fine for first time cannabis possession?',
        type: 'MCQ',
        questions: ['€50', '€500', '€1000', '€2500'],
        points: [0, 0, 1, 0], // First True, second False
        correct_feedback:
          'Congrats! You just saved 1000 euros for your next trip! If the court decides that the drug was for personal use and not for sale or distribution and this was a first offence, it can impose a class D fine of 1000 euros on summary conviction in a District Court.',
        incorrect_feedback:
          'Wow! You just lost 1000 euros that you could otherwise save for your next trip! So, if the court decides that the drug was for personal use and not for sale or distribution and this was a first offence, it can impose a class D fine of 1000 euros on summary conviction in a District Court.'
      },
      {
        id: 5,
        visible: false,
        answer: 'No',
        type: 'Binary',
        text: 'Students habitually decide to take drugs without thinking',
        points: [1, 0],
        correct_feedback:
          'This is correct! When students asked whether they make a second though before deciding taking drugs, the majority said they don’t. ',
        incorrect_feedback:
          'This is incorrect. When students asked whether they make a second though before deciding taking drugs, the majority said they don’t. '
      },
      {
        id: 6,
        visible: false,
        answer: 'Yes',
        type: 'Binary',
        points: [1, 0],
        text: 'Mixing drugs with alcohol increases the risk of becoming unwell',
        correct_feedback:
          'That’s true! Indeed, mixing drugs, including alcohol or other legal or illegal medication increases your risk of becoming unwell or overdosing your system. What would you choose? ',
        incorrect_feedback:
          'Oops, this is incorrect. Mixing drugs, including alcohol or other legal or illegal medication increases your risk'
      },
      {
        id: 7,
        visible: false,
        type: 'Binary',
        answer: 'No',
        points: [1, 0],
        text:
          'Students who do a lot of activities (sports, hobbies etc.) are less likely to experiment with drugs',
        correct_feedback:
          'This is correct! Students who keep themselves busy with various activities have lower chances to use drugs than those who do not. Why? Students who are activity, they get lots of fun most of the days, thus they don’t need a “happy moment” to get high. ',
        incorrect_feedback:
          'This is incorrect. Students who keep themselves busy with various activities have lower chances to use drugs than those who do not. Why? Students who are activity, they get lots of fun most of the days, thus they don’t need a “happy moment” to get high.'
      },
      {
        id: 8,
        visible: false,
        answer: 2,
        type: 'MCQ',
        text: 'What is the main reason that students take drugs?',
        questions: [
          'coping with academic stress',
          'improve performance in sports or at the gym',
          'for enjoyment or fun',
          'because their friends take drugs'
        ],
        points: [0, 0, 1, 0],
        correct_feedback:
          'Correct! The majority of students take drugs for fun or to have more fun. Given that drugs have risks, how fun would be for you to put yourself at risk? Are drugs the only gateway to have fun?',
        incorrect_feedback:
          'Sorry, this is not the correct answer. That’s ok! All the answers could be correct but the majority of students take drugs for fun or to have more fun. Given that drugs have risks, how fun would be for you to put yourself at risk? Are drugs the only gateway to have fun?'
      },
      {
        id: 9,
        visible: false,
        type: 'Binary',
        answer: 'No',
        points: [0, 1],
        text:
          'The positive effect of drugs (increased energy, boosted confidence) have long-standing effects',
        correct_feedback:
          'This is correct! You ‘ve got it. Drugs may increase energy and boost self-confidence, but these effects last as much as the drug runs through your veins. Typically, depending on the level of use and drug type, these effects can last between 30’ to 2 hours and then gone!  Can you consider alternatives to boost your energy and confidence? You do have the most power potent drug: your valuable self and your sharp brain!',
        incorrect_feedback:
          'This is incorrect! Drugs may increase energy and boost self-confidence, but these effects last as much as the drug runs through your veins. Typically, depending on the level of use and drug type, these effects can last between 30’ to 2 hours and then gone!  Can you consider alternatives to boost your energy and confidence? You do have the most power potent drug: your valuable self and your sharp brain!'
      },
      {
        id: 10,
        visible: false,
        answer: 2,
        type: 'MCQ',
        text: 'What is the main reason that drugs are addictive?',
        questions: [
          'target those with emotional vulnerabilities make them depend on drugs',
          'persuade students that the use is the only way to have fun or more fun',
          "target the 'reward' part of the brain which gives us happiness",
          'interact with blood that goes to the brain. '
        ],
        points: [0, 0, 1, 0],
        correct_feedback:
          'Correct answer! Most drugs when abused target the brain’s reward system by flooding the circuit with a substance called dopamine. Dopamine regulates movement, emotion, motivation and feelings of pleasure. When activated at normal levels through fun activities and hobbies (e.g,., sports and sex), this system rewards our natural behaviours. Overstimulating the system with drugs, however, makes us euphoric while teaching us to repeat taking drugs. ',
        incorrect_feedback:
          'Incorrect answer! Most drugs when abused target the brain’s reward system by flooding the circuit with a substance called dopamine. Dopamine regulates movement, emotion, motivation and feelings of pleasure. When activated at normal levels through fun activities and hobbies (e.g,., sports and sex), this system rewards our natural behaviours. Overstimulating the system with drugs, however, makes us euphoric while teaching us to repeat taking drugs..'
      },
      {
        id: 11,
        visible: false,
        answer: 1,
        type: 'MCQ',
        text:
          'Why are drugs more addictive than natural rewards such as chocolate, sports or sex?',
        questions: [
          'because they can control the way we think and make us addictive',
          'because they can release 2 to 10 times the amount of dopamine',
          'because they increase our blood circulation',
          'because they target to make us happy'
        ],
        points: [0, 1, 0, 0],
        correct_feedback:
          'Got it! When some drugs of abuse are taken they can release 2 to 10 times the amount of dopamine than natural rewards such as chocolate or sex. In some cases, this occurs immediately (as when drugs are smoked or taken). ',
        incorrect_feedback:
          'Oops, this is not correct. When some drugs of abuse are taken they can release 2 to 10 times the amount of dopamine than natural rewards such as chocolate or sex. In some cases, this occurs immediately (as when drugs are smoked or taken).'
      },
      {
        id: 12,
        visible: false,
        answer: 2,
        type: 'MCQ',
        text: 'What is the most common effect of cannabis?',
        questions: [
          'leads to depression',
          'increases the risk of death',
          'impairs short-term memory and our ability to learn',
          'reduces our ability to coordinate movements '
        ],
        points: [0, 0, 1, 0],
        correct_feedback:
          'Great! That’s the correct answer! Marijuana is the most common drug of abuse among college students. This illegal drug impairs short-term memory and learning, the ability to focus attention and coordination. It also increases heart rate, can harm the lungs , and can increase the risk of psychosis- losing contact with reality- in those with  an underlying vulnerability.',
        incorrect_feedback:
          'This is not the correct answer. The correct answer is (c) impairs short-term memory and our ability to learn. Marijuana is the most common drug of abuse among college students. This illegal drug impairs short-term memory and learning, the ability to focus attention and coordination. It also increases heart rate, can harm the lungs , and can increase the risk of psychosis- losing contact with reality- in those with  an underlying vulnerability.'
      }
    ]
  }),
  methods: {
    // TODO: Refactoring needed, unfinished
    select(user_answer, question_no) {
      let correct_answers = 0
      if (user_answer == this.quiz_questions[question_no].answer) {
        this.answers[question_no] = true
      } else {
        this.answers[question_no] = false
      }
      this.quiz_questions[question_no].visible = true

      for (var k = 0; k < this.answers.length; k++) {
        if (this.answers[k] == true) {
          console.log('Answer ' + k + ' is the correct answer - adding')
          correct_answers++
        }
      }

      if (this.answers.length == 12) {
        this.quiz_score = '' + correct_answers + '/' + 12 + ''
        this.$emit('completed', '1-5-A')
      }
    }
  },
  prop: {
    settings: Array
  },
  beforeDestroy() {
    this.$store.commit('profile/setQuizAnswers', this.answers)
    this.$store.commit('profile/setQuizScore', this.quiz_score)
  },
  mounted() {
    this.$emit('selected', 'completed')
  }
}
</script>
<style scoped>
.label {
  padding: 10px;
}

.list {
  padding: 2px;
  display: flex;
}

.radio {
  padding: 12px;
}

.active {
  color: white;
}

.question {
  height: 250px;
}
</style>