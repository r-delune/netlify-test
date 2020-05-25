export const state = () => ({
	dast_score: null,
	qol_score: null,
	quiz_score: null,
	decision_making_score: null,
	injunctive_norms_score: null,
	descriptive_norms_score: null,
	progression_score: null,
	willingness_to_change_score: null,
	confidence_to_change_score: null,
	behavioural_awareness_score: [],
	user_type: null,
	risk_level: null,
	primary_drug: null,
	dastList: null,
	drugList: null,
	positivesList: null,
	negativesList: null,
	quizAnswers: [],
	cues: [],
	needs: [],
	interests: [],
	skills: [],
	harmReduction: [],
	personalValues: [],
	valuesSelection: [],
	injunctiveNorms: [],
	descriptiveNorms: [],
	valuesImportance: [],
	valuesConsistency: [],
	personalCues: [],
	reasonsForUse: [],
	relationshipScores: [],
	personalHooksA: [],
	personalHooksB: [],
	harmsExperienced: []
})

export const getters = {
	getUserType(state) {
		return state.user_type
	},
	getRiskLevel(state) {
		return state.risk_level
	},
	getSelectedDrugs(state) {
		return state.drugList
	},
	getPrimaryDrug(state) {
		return state.primary_drug
	},
	getDAS10Score(state) {
		return state.dast_score
	},
	getDAS10(state) {
		return state.dastList
	},
	getQuizScore(state) {
		return state.quiz_score
	},
	getQuizAnswers(state) {
		return state.quizAnswers
	},
	getWillingnessToChange(state) {
		return state.willingness_to_change
	},
	getDecisionMakingScore(state) {
		return state.decision_making_score
	},
	getPositivesList(state) {
		return state.positivesList
	},
	getNegativesList(state) {
		return state.negativesList
	},
	getInjunctiveNorms(state) {
		return state.injunctiveNorms
	},
	getDescriptiveNorms(state) {
		return state.descriptiveNorms
	},
	getDescriptiveNormsScore(state) {
		return state.descriptive_norms_score
	},
	getInjunctiveNormsScore(state) {
		return state.injunctive_norms_score
	},
	getPersonalValues(state) {
		return state.personalValues
	},
	getValuesSelection(state) {
		return state.valuesSelection
	},
	getPersonalCues(state) {
		return state.personalCues
	},
	getReasonsForUse(state) {
		return state.reasonsForUse
	},
	getCues(state) {
		return state.cues
	},
	getHarmReduction(state) {
		return state.harmReduction
	},
	getRelationshipScores(state) {
		return state.relationshipScores
	},
	getQOLScore(state) {
		return state.qol_score
	},
	getProgressionScore(state) {
		return state.progression_score
	},
	getValuesConsistency(state) {
		return state.valuesConsistency
	},
	getValuesImportance(state) {
		return state.valuesImportance
	},
	getConfidenceToChangeScore(state) {
		return state.confidence_to_change_score
	},
	getBehaviouralAwarenessScore(state) {
		return state.behavioural_awareness_score
	},
	getPersonalHooksA(state) {
		return state.personalHooksA
	},
	getPersonalHooksB(state) {
		return state.personalHooksB
	},
	getNeeds(state) {
		return state.needs
	},
	getHarmsExperienced(state) {
		return state.harmsExperienced
	},
	getSkills(state) {
		return state.skills
	},
	getInterests(state) {
		return state.interests
	}
}

export const mutations = {
	storePageData(state, page_details, answers) {
		console.log('STORING PAGE')
		console.log('page_details')
		console.log(page_details)
		console.log('answers')
		console.log(answers)
	},
	storeCode(state, ctx) {
		console.log('STORING CODE')
	},
	setConfidenceToChangeScore(state, confidence_to_change_score) {
		state.confidence_to_change_score = confidence_to_change_score
	},
	setValuesConsistency(state, values_consistency) {
		state.valuesConsistency = values_consistency
	},
	setValuesImportance(state, values_importance) {
		state.valuesImportance = values_importance
	},
	setDAS10(state, answers) {
		const dastList = [];
		let score = 0;
		let yes_scores = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
		let no_scores = [0, 1, 0, 0, 0, 0, 0, 0, 0]
		answers.forEach(function (answer, index) {
			// Add scoring
			if (answer.answer == 'Yes') {
				score += yes_scores[index]
			} else {
				score += no_scores[index]
			}
			dastList[index] = {
				'question': answers.questions[index],
				'answer': answer.answer,
				'question_no': answer.question_no
			}
		})
		state.dastList = dastList
		state.dast_score = score

		// TODO: Check is risk level used
		if (state.dast_score >= 5 && state.dast_score <= 10) {
			state.risk_level = 'Severe'
			state.user_type = 'Severe'
		}
		else if (state.dast_score >= 2 && state.dast_score < 5) {
			state.risk_level = 'Moderate'
			state.user_type = 'Moderate'
		}
		else if (state.dast_score <= 1) {
			state.risk_level = 'Low'
			state.user_type = 'Non-User'
		}

		this.$toast.success('Set user type - ' + state.user_type)
	},
	setUserType(state, type) {
		state.user_type = type
		this.$toast.success('Set user type -' + state.user_type)
	},
	setSelectedDrugs(state, selected_drugs) {
		state.drugList = selected_drugs
	},
	setPrimaryDrug(state, primary_drug) {
		state.primary_drug = primary_drug
	},
	setRiskLevel(state, risk_level) {
		state.risk_level = risk_level
	},
	setWillingnessToChangeScore(state, willingness_score) {
		state.willingness_to_change_score = willingness_score
	},
	setDecisionMakingScore(state, decision_making_score) {
		state.decision_making_score = decision_making_score
	},
	setPositivesList(state, positives) {
		state.positivesList = positives
	},
	setNegativesList(state, negatives) {
		state.negativesList = negatives
	},
	setQuizScore(state, quiz_score) {
		state.quiz_score = quiz_score
	},
	setQuizAnswers(state, answers) {
		state.quizAnswers = answers
	},
	setPersonalValues(state, personal_values) {
		state.personalValues = personal_values
	},
	setValuesSelection(state, values_selection) {
		state.valuesSelection = values_selection
	},
	setInjunctiveNorms(state, injunctive_norms) {
		let score = 0
		// TODO: Add all scores
		injunctive_norms.forEach(function (answer) {
			const val = parseInt(answer.points)
			score = score + val
		})
		state.injunctive_norms_score = score
		state.injunctiveNorms = injunctive_norms
	},
	setDescriptiveNorms(state, descriptive_norms) {
		let score = 0
		// get average score
		descriptive_norms.forEach(function (answer, index) {
			score = score + parseInt(answer.points)
		})
		state.descriptive_norms_score = score / descriptive_norms.length
		state.descriptiveNorms = descriptive_norms
	},
	setPersonalCues(state, personal_cues) {
		state.personalCues = personal_cues
	},
	setCues(state, cues) {
		state.cues = cues
	},
	setHarmReduction(state, harm_reduction) {
		state.harmReduction = harm_reduction
	},
	setReasonsForUse(state, reasons_for_use) {
		state.reasonsForUse = reasons_for_use
	},
	setRelationshipScores(state, relationship_scores) {
		state.relationshipScores = relationship_scores
	},
	setBetterQOLScore(state, qol_score) {
		state.qol_score = qol_score
	},
	setProgressionScore(state, progression_score) {
		state.progression_score = progression_score
	},
	setBAScore(state, behavioural_awareness_score) {
		state.behavioural_awareness_score = behavioural_awareness_score
	},
	setPersonalHooksA(state, personal_hooks) {
		state.personalHooksA = personal_hooks
	},
	setPersonalHooksB(state, personal_hooks) {
		state.personalHooksB = personal_hooks
	},
	setNeeds(state, needs) {
		state.needs = needs
	},
	setHarmsExperienced(state, harms_experienced) {
		state.harmsExperienced = harms_experienced
	},
	setSkills(state, skills) {
		state.skills = skills
	},
	setInterests(state, interests) {
		state.interests = interests
	},
	recallProfile(state, profile) {
		console.log('Recalling stored profile')
		console.log(profile)
		state.user_type = profile.user_type,
			state.primary_drug = profile.primary_drug,
			state.dast_score = profile.dast_score,
			state.quiz_score = profile.quiz_score,
			state.risk_level = profile.risk_level,
			state.personalValues = profile.personalValues
		state.negativesList = profile.negativesList
		state.positivesList = profile.positivesList
	}
}
