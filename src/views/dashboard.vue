<template >
  <v-app style="background: #e1e8eb" v-if="this.$store.state.isAuthenticated">
    <v-span class="text-body-2 font-weight-bold mt-2 pl-5 mb-2">DASHBOARD</v-span>


    <!-- สร้าง url -->
    <!-- <create /> -->

    <!-- แสดงหน้า สรุป -->
    <div v-if="this.$store.state.getsum_url.length <= 0">
      <v-card class="text-center pa-10" elevation="0" color="weservegrey">
        <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
      </v-card>
    </div>
    <div v-else>
      <div>
        <v-row no-gutters justify="center" class="pr-5 pl-3 mt-2">
          <v-col v-for="n in this.$store.state.getsum_url" :key="n.title" cols="12" sm="4">
            <v-card outlined tile elevation="1" class="ml-2 mb-2 rounded-lg ">
              <v-card color="weserveback" class="rounded-0 pl-4 pt-2 pb-2" elevation="0">
                <span class="text-caption">{{ n.title }}</span>
              </v-card>
              <v-card-title>
                <!-- <div class="d-flex">
                      <v-icon color="blue" dense small>{{ n.icon }}</v-icon>
                      <v-spacer></v-spacer>
                      <span class="text-body-1">{{ n.title }}</span>
                    </div> -->
                <div class="d-flex">
                  <v-spacer></v-spacer>
                  <span>{{ n.sum }}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class=" mt-1">
        <v-form v-model="form" @submit.prevent="onSubmit_search">
          <v-dialog v-model="dialog" class="text-center" :width="size_dialog_date">
            <template v-slot:activator="{ props }">
              <v-btn class="rounded-lg ml-5" color="bule" v-bind="props" prepend-icon="mdi-calendar-month" size="small">
                <v-span class="text-caption">Check Click</v-span>
              </v-btn>
            </template>

            <v-img>
              <v-card class="rounded-lg">
                <v-card color="weserveyellow pa-3">
                  <v-span class="text-body-2">Check the number of clicks</v-span>
                </v-card>
                <v-card class="pa-2">
                  <DatePicker name="date" startingView="dd-MM-YYYY" class="datepicker" :min="newdate" v-model="date"
                    mode="dateTime" columns="1" is-range />
                  <v-spacer></v-spacer>
                  <v-card-actions class="mr-6">
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="dialog = false">
                      <span class="text-caption text-red">Close</span>
                    </v-btn>
                    <v-btn color="success" @click="search_day(date.start, date.end)">
                      <span class="text-caption">Search</span>
                    </v-btn>
                    <!-- <v-btn @click="search_day(date.start, date.end)" size="small" class="rounded-xl"
                    color="success">ค้นหา</v-btn>
                    <v-btn @click="search_day(date.start, date.end)" size="small" class="rounded-xl"
                    color="success">ค้นหา</v-btn> -->
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-img>
          </v-dialog>
        </v-form>
      </div>
      <v-card class="pa-4 ml-5 mr-5 mb-5 mt-3" v-if="check_mychart == 1">
        <canvas id="myChart"></canvas>
      </v-card>
      <v-card class="pa-4 ml-5 mr-5 mb-5 mt-3 text-center" v-else-if="check_mychart == 2">
        <span class="text-body-1">No Information</span>
      </v-card><br>

      <v-card class="text-center pa-10" elevation="0" color="weservegrey" v-if="check_load_mychart == 1">
        <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
      </v-card>
      <!-- <div>
          {{ this.$store.state.getsum_url }}
        </div> -->

      <!-- กราฟที่จะแสดง -->
      <!-- <canvas id="myChart" width="400" height="400"></canvas> -->

      <!-- <div class="pl-5 pr-5 " v-if="check.length > 0">
            <v-card class="rounded-xl">
              <div class="pa-3 d-flex">
                <v-card-text>
                  asdfasd
                  <canvas id="myChart" width="400" height="400"></canvas>

                  <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                    :width="width" :height="height" />
                </v-card-text>
              </div>
            </v-card>
          </div>
          <div v-else><br>
            <v-row style=" align-items: center; justify-content: center">
              <v-col cols="4">

              </v-col>
              <v-col cols="4" class="text-center">

              </v-col>
              <v-col cols="4">
              </v-col>
            </v-row>
          </div> -->




      <div>
        <!-- <datepicker lowerLimit="2023,1,15"></datepicker>
            <Datepicker v-model="example2" :upper-limit="example2_to" :lower-limit="example2_from" /> -->
        <!-- <datepicker v-model="date" lang="fr" locale="date-fns/locale/fr" format="dd-MM-YYYY" type="date"
              :lowerLimit="new Date()"></datepicker> -->
        <!-- <datepicker
          v-model="selected"
          :locale="locale"
          :upperLimit="to"
          :lowerLimit="from"
        /> -->
        <!-- {{ datalabel }} -->


      </div>

    </div>


  </v-app>
</template>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
<script>

import axios from 'axios'
import create from "../components/create.vue";
import Datepicker from 'vuejs3-datepicker';
import Chart from 'chart.js/auto';

// import { Bar } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// var state = {
//   date: new Date(2016, 9, 16)
// }
import { ref, reactive } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
// import { and } from 'ajv/dist/compile/codegen';
const date = ref(new Date())
console.log(date, "testdate")
date.value.setDate(Number(date.value.getDate()) + 35)
const range = reactive({
  start: new Date(),
  end: date.value
  // new Date(2016, 9,  16)
})
export default {
  name: "dashboard",
  components: { create, Datepicker, DatePicker },
  beforeCreate() {
    this.$store.commit('initalizeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token" + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },


  // props: {
  //   chartId: {
  //     type: String,
  //     default: 'bar-chart'
  //   },
  //   datasetIdKey: {
  //     type: String,
  //     default: 'label'
  //   },
  //   width: {
  //     type: Number,
  //     default: 100
  //   },
  //   height: {
  //     type: Number,
  //     default: 50
  //   },
  //   cssClasses: {
  //     default: '',
  //     type: String
  //   },
  //   styles: {
  //     type: Object,
  //     default: () => { }
  //   },
  //   plugins: {
  //     type: Array,
  //     default: () => []
  //   },
  // },


  data() {
    return {
      check_load_mychart: 0,
      check_mychart: 0,
      check_value_mychart: 0,
      size_dialog_date: null,
      dialog: false,
      date: '',
      // newdate: new Date("20/1/2023"),
      search_day_success: "",
      a: 0,
      // form: '',
      datestart: [],
      dateend: [],
      date_start: '',
      date_end: '',

      right: null,
      // components: { Bar },
      posts: [],
      loading: false,
      form: true,
      check: '',
      datalabel: null,
      value_link: null,
      value_qr: null,
      myChart: null
    }
  },
  methods: {
    search_day(datestart, dateend) {
      // const datestart = `${datestart.getFullYear()}-${datestart.getMonth()+1}-${datestart.getDate()}`;
      this.check_load_mychart = 1
      this.check_mychart = 0
      setTimeout(() => (
        this.check_load_mychart = 0
      ), 10000)
      this.dialog = false
      const date1 = this.date
      var date_1 = new Date(datestart),
        mnth = ("0" + (date_1.getMonth() + 1)).slice(-2),
        day = ("0" + date_1.getDate()).slice(-2);
      this.date_start = [date_1.getFullYear(), mnth, day].join("-")
      const date_start = this.date_start

      var date_2 = new Date(dateend),
        mnth = ("0" + (date_2.getMonth() + 1)).slice(-2),
        day = ("0" + date_2.getDate()).slice(-2);
      this.date_end = [date_2.getFullYear(), mnth, day].join("-")
      const date_end = this.date_end
      // if (!this.form) return
      // this.loading = true
      setTimeout(() => (this.loading = false), 5000)
      const token = this.$store.state.token
      axios.get('/api/showcount/' + date_start + '/' + date_end, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        this.search_day_success = response.data
        this.check = response.data.day
        this.datalabel = response.data.day
        this.value_link = response.data.count_link
        this.value_qr = response.data.count_qr
        if (response.data.message == '') {
          setTimeout(() => (
            this.check_mychart = 2,
            this.check_load_mychart = 0
          ), 5000)
        } else if (response.data.count_link == '') {
          setTimeout(() => (
            this.check_mychart = 2,
            this.check_load_mychart = 0
          ), 5000)
        } else {
          setTimeout(() => (
            this.check_mychart = 1,
            this.check_load_mychart = 0
          ), 5000)
        }
        setTimeout(() => (this.show_chart()), 5000)
      })
        .catch(error => {
          console.log(error)
        })
      // return this.test()

    },
    show_chart() {

      let max = 0
      max = Math.max.apply(Math, this.value_link)
      if (max < 5) {
        max = 5
      } else if (max < 10) {
        max = 10
      }
      let myChart = null;
      const data = {
        labels: this.datalabel,
        datasets: [{
          label: 'Click of Link',
          data: this.value_link,
          backgroundColor: [
            '#FFC801',
          ],
        },
        {
          label: 'Click of Qr cord',
          data: this.value_qr,
          backgroundColor: [
            '#0d0d0b',
          ],
        }
        ]
      };
      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              suggestedMin: 0,
              suggestedMax: max + max / 4,
            }
          }
        }
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      if (myChart != null) {
        myChart.destory();
      }
      myChart = new Chart(ctx, config);
    }
  },
  mounted() {
    this.$store.dispatch('getSumUrl', this.$store.state.token)
    this.$store.dispatch('getUrl', this.$store.state.token)
    if (this.$vuetify.display.name == "lg" || this.$vuetify.display.name == "xl" || this.$vuetify.display.name == "md") {
      this.size_dialog_date = '50%'
    } else {
      this.size_dialog_date = '100%'
    }
  },
  // computed: {
  //   test: function () {
  //     this.chartData.labels = this.search_day_success.day
  //     this.chartData.datasets[0].data = this.search_day_success.count_day
  //     return this.a
  //   }
  // },
}
</script>




