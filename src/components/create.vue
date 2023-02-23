<template >
  <div style="background: #e1e8eb" v-if="this.$store.state.isAuthenticated">
    <v-form v-model="form_create_normal" @submit.prevent="onSubmit_create_normal">
      <div class="d-flex pl-5  " style=" align-items: center; justify-content: center">
        <v-card width="100%" height="100%" class="rounded-lg mr-1 mb-1">
          <v-text-field v-model="url" prepend-inner-icon="mdi-link-variant" :rules="validationURl" density="compact"
            clearable label="URL " higth="80px" counter="255" variant="solo" single-line hide-details
            :readonly="loading_normal" name="url" type="url">
          </v-text-field>
        </v-card>
        <!-- <v-btn rounded="pill" color="success" min-width="50" :disabled="!form_create_normal" :loading="loading_normal"
                          size="large" type="submit" variant="elevated" class="mr-5">สร้าง</v-btn> -->
        <div>
          <v-dialog v-model="dialog_create_narmol_success" persistent :width="size_dialog_advace">
            <template v-slot:activator="{ props }">
              <v-btn v-btn rounded="lg" color="success" min-width="50" :disabled="!form_create_normal"
                :loading="loading_normal" type="submit" variant="elevated" class="ml-1 mr-5" v-bind="props">
                <span class="text-caption "> Create</span></v-btn>
            </template>
            <v-card class="rounded-lg">
              <v-card color="weserveyellow" class="rounded-0 pa-3">
                <div class="text-weserveback">
                  <span class="text-body-2">Your URL</span>
                </div>
              </v-card>
              <v-card-title v-if="create_url_success != ''">
                <div class="d-flex align-center pl-5 pr-5">
                  <v-text-field class="mr-2 mt-5" density="compact" variant="outlined"
                    :model-value="create_url_success.short_URL" readonly>
                  </v-text-field>
                  <v-btn @click="copy" color="bule" variant="tonal"> <span class="text-caption "
                      color="green-darken-1">copy</span> </v-btn>
                </div>
                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="6" class="d-flex align-center ">
                    <v-img :src="g + create_url_success.code"></v-img>
                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3">
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <v-btn class="text-caption" variant="tonal" color="bule" :href="g + create_url_success.code"
                      target="_blank" rel="noreferrer">

                      Download
                    </v-btn>

                  </v-col>
                  <v-col cols="3">
                  </v-col>
                </v-row>

                <!-- <a :href="g + create_url_success.code" download>
                                  Download
                                </a> -->
                <!-- f"D:/test/ShortURL/img/{user_id}{random_string}qr.png" -->
                <!-- <v-img alt="Vue logo" class="logo" :src="img" max-height="150" max-width="220" /> -->
                <div class="d-flex">
                  <v-spacer></v-spacer>
                  <v-btn color="red" @click="cheang_1" variant="text">
                    <span class="text-caption ">Close</span>
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-title v-else>
                <v-card class="text-center pa-10" elevation="0">
                  <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
                </v-card>
              </v-card-title>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-form>


    <!-- create advace dialog -->
    <div class="pl-5 mb-2 mt-1">
      <v-dialog v-model="dialog_create_advace" persistent :width="size_dialog_advace">
        <template v-slot:activator="{ props }">
          <!-- <v-btn   color="blue" v-bind="props" @click="chang_select_advace">
                            <v-span class="text-caption">Create Advace URL</v-span>
                          </v-btn> -->
          <v-btn v-bind="props" @click="chang_select_advace" color="blue text-caption" class="rounded-lg"
            prepend-icon="mdi-plus"> Advace URL</v-btn>
        </template>
        <v-card class="rounded-lg " elevation="0">
          <v-card color="weserveyellow pa-3 rounded-0">
            <span class="text-body-2 ma-2 ">Create Advace URL</span>
          </v-card>
          <v-form v-model="form_create_advace" @submit.prevent="onSubmit_create_advace">
            <v-card-text class="pl-6 pr-6 pt-6">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="url_advace" bg-color="white" append-inner-icon="mdi-link-variant"
                    :rules="validationURl" density="compact" clearable label="Please enter URL " counter="255"
                    variant="outlined" hide-details :readonly="loading_normal" name="url" type="url">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select v-model="select" :items="this.$store.state.album" item-title="name_Album" item-value="id"
                    density="compact" label="Select Collection" variant="outlined" persistent-hint return-object
                    hide-details name="name_album"></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="key" density="compact" label="Please enter keyword" counter="255"
                    variant="outlined" hide-details name="key" type="url"></v-text-field>
                </v-col>
                <!-- single-line -->
                <v-col cols="12" v-if="checkbox1 == true">
                  <v-text-field  v-model="ex_date" mode="dateTime" bg-color="white"
                    density="compact" clearable label="Choose End Date " variant="outlined" hide-details
                    :min="timestamp" :readonly="loading_normal" name="ex_date" type="date"></v-text-field>
                </v-col>
                <v-checkbox v-model="checkbox1"> <template v-slot:label>
                    <span style="font-size: 0.8em">End Date</span>
                  </template></v-checkbox>

              </v-row>
            </v-card-text>
            <!-- ปิด -->
            <v-card-actions class="mr-5">
              <v-spacer></v-spacer>
              <v-btn color="red" @click="close_dialog_create_advace">
                <span class="text-caption">Close</span>
              </v-btn>

              <v-dialog v-model="dialog_create_advace_success" persistent :width="size_dialog_advace">
                <template v-slot:activator="{ props }">
                  <v-btn color="success" :disabled="!form_create_advace" :loading="loading_advace" type="submit">
                    <span class="text-caption" v-bind="props">Create</span>
                  </v-btn>
                </template>
                <v-card class="rounded-lg">
                  <v-card color="weserveyellow" class="rounded-0 pa-3">
                    <div class="text-weserveback ">
                      <span class="text-body-2">Your URL</span>
                    </div>
                  </v-card>

                  <v-card-text v-if="create_url_success != ''">
                    <!-- <div>
                                        <v-text-field density="compact" variant="outlined" :model-value="create_url_success.short_URL"
                                          readonly></v-text-field>
                                      </div>
                                      <div class="d-flex align-center ">
                                        <img max-height="30" max-width="30" :src="g + create_url_success.code" />
                                      </div> -->
                    <div class="d-flex align-center pl-5 pr-5">
                      <v-text-field class="mr-2 mt-5" density="compact" variant="outlined"
                        :model-value="create_url_success.short_URL" readonly>
                      </v-text-field>
                      <v-btn @click="copy" color="bule" variant="tonal"> <span class="text-caption "
                          color="green-darken-1">copy</span> </v-btn>
                    </div>
                    <v-row>
                      <v-col cols="3">
                      </v-col>
                      <v-col cols="6" class="d-flex align-center ">
                        <v-img :src="g + create_url_success.code"></v-img>
                      </v-col>
                      <v-col cols="3">
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="3">
                      </v-col>
                      <v-col cols="6" class="text-center">
                        <v-btn class="text-caption" variant="tonal" color="bule" :href="g + create_url_success.code"
                          target="_blank" rel="noreferrer">
                          Download
                        </v-btn>
                      </v-col>
                      <v-col cols="3">
                      </v-col>
                    </v-row>

                    <div class="d-flex">
                      <v-spacer></v-spacer>
                      <v-btn color="red" @click="cheang_2" variant="text">
                        <span class="text-caption">Close</span>
                      </v-btn>
                    </div>
                  </v-card-text>
                  <v-card-title v-else>
                    <v-card class="text-center pa-10" elevation="0">
                      <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
                    </v-card>
                  </v-card-title>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-form>

        </v-card>
      </v-dialog>
    </div>
    <div class="pl-5 pr-5 pt-2 " v-if="Alert == 1">
      <v-alert density="comfortable" type="success" variant="tonal">
        Create URL <strong>success</strong>
      </v-alert>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "create",
  data() {
    return {
      checkbox1: false,
      size_dialog_advace: '50%',
      today_format: '',
      select: null,
      datecreate: null,
      datecreate2: null,
      Alert: 0,
      text_copy: 'บ้าน้า',
      dialog_create_narmol_success: false,
      dialog_create_advace: false,
      dialog_create_advace_success: false,
      loading_normal: false,
      form_create_normal: false,
      form_create_advace: false,
      loading_advace: false,
      url: '',
      url_advace: '',
      key: '',
      ex_date: '',
      album: '',
      timestamp: '',
      create_url_success: '',
      validationURl: [
        v => !!v || 'Please enter URL',
        v => /.+\..+/.test(v) || 'Please enter URL',
      ],
      g: "https://storage.googleapis.com/my_project_short_url_01/images/",

    }
  },
  watch: {
    // whenever question changes, this function will run
    Alert() {
      setTimeout(() => (this.Alert = 0), 7000)
    }
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
      this.today_format = date
      return date;
    },
    chang_select_advace() {
      this.select = { name_Album: this.$store.state.album[0].name_Album, id: this.$store.state.album[0].id }
      const today = new Date();
      if (today.getMonth() + 1 < 10) {
        const date = today.getFullYear() + '-' + 0 + (today.getMonth() + 1) + '-' + today.getDate();
        const dateTime = date
        this.timestamp = dateTime;
      } else if (today.getDate() < 10) {
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + 0 + today.getDate();
        const dateTime = date
        this.timestamp = dateTime;
      } else {
        const date = today.getFullYear() + '-'(today.getMonth() + 1) + '-' + today.getDate();
        const dateTime = date
        this.timestamp = dateTime;
      }
    },
    onSubmit_create_normal() {
      if (!this.form_create_normal) return
      this.loading_normal = true
      setTimeout(() => (this.loading_normal = false), 1000)
      this.album = this.$store.state.album[0].id
      const token = this.$store.state.token
      const formData = {
        original_link: this.url,
        name_album: this.album,
        check_date: this.checkbox1,
      };
      axios.post('/api/create/', formData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        this.create_url_success = response.data
        console.log(this.create_url_success)
        console.log(require.data)
      })
        .catch(error => {
          console.log(error)
        })
      this.url = ''
    },

    onSubmit_create_advace() {
      if (!this.form_create_advace) return
      this.loading_advace = true
      setTimeout(() => (this.loading_advace = false), 1000)
      // this.album = this.$store.state.album[0].id
      const token = this.$store.state.token
      const formData = {
        original_link: this.url_advace,
        name_album: this.select.id,
        key: this.key,
        ex_date: this.ex_date,
        check_date: this.checkbox1,
      };
      axios.post('/api/create/', formData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        this.create_url_success = response.data
      })
        .catch(error => {
          console.log(error)
        })

      this.url_advace = ''
      this.key = ''
      this.ex_date = ''
      this.checkbox1 = false
    },
    close_dialog_create_advace() {
      this.dialog_create_advace = false
      this.url_advace = ''
      this.key = ''
      this.ex_date = ''
    },
    copy() {
      try {
        navigator.clipboard.writeText(this.create_url_success.short_URL)
      } catch (e) {
        throw e
      }
    },
    cheang_1() {
      this.dialog_create_narmol_success = false
      this.$store.dispatch('getUrl', this.$store.state.token)
      this.Alert = 1

    },
    cheang_2() {
      this.dialog_create_advace_success = false
      this.dialog_create_advace = false
      this.$store.dispatch('getUrl', this.$store.state.token)
      this.Alert = 1
    },


  },
  mounted() {
    this.$store.dispatch('getAlbum', this.$store.state.token)
    if (this.$vuetify.display.name == "lg" || this.$vuetify.display.name == "xl" || this.$vuetify.display.name == "md") {
      this.size_dialog_advace = '50%'
    } else {
      this.size_dialog_advace = '100%'
    }
  },
}
</script>
<style>
.v-text-field input {
  font-size: 0.8em;
}
</style>




