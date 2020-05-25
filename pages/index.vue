<template>
  <div>
    <div class="row">
      <div class="text-center floater col-4 col-4-sm" v-for="(course, i) in user_courses" :key="i">
        <nuxt-link slot="brand" :to="'page/'+course.id+'.0'">
          <!-- <font-awesome-icon
            class="activity_icon"
            :style="{ color: course.color }"
          />-->
          {{course.name}}
        </nuxt-link>
        <div class="progress-label">
          <slot name="label">
            <span>{{course.key}}</span>
          </slot>
        </div>
        <!-- <menu-progress type="success" :value="course.progress"></menu-progress> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user_courses: 'navigation/getMenuItems'
    })
  },
  created() {
    this.$store.dispatch('navigation/fetchNavigationData')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 3.2rem;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
a {
  font-weight: bold;
  color: #526488;
}
.deploy-button {
  margin-top: 1rem;
}
</style>
