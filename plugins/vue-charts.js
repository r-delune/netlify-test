import Vue from 'vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'

Vue.component("my-line", {
  extends: Line,
  props: ["options", "mydata"],
  mounted() {
    this.renderChart(this.mydata, this.options);
  }
});

Vue.component("my-bar", {
  extends: Bar,
  props: ["options", "mydata"],
  mounted() {
    this.renderChart(this.mydata, this.options);
  }
});

Vue.component("my-doughnut", {
  extends: Doughnut,
  props: ['chartData', 'options'],
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
});