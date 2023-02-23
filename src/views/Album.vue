<template>
  <v-app style="background: #e1e8eb">
    <!-- <create /> -->



    <!-- สร้าง Album -->
    <!--     
    <div style="display:flex" class="pl-5 mt-5">
      <h4 style="color:grey">Album</h4>
      <v-spacer></v-spacer>
      <v-btn variant="text" color="bule" class="mr-5">
        <h3>+ สร้าง</h3>

        <v-dialog v-model="dialog_create_album" activator="parent">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-card min-width="50%" class="rounded-xl">
              <v-card-text>
                <v-card-text>
                  <div class="text-weserveback text-center">
                    <h3>create album</h3>
                  </div><br>
                  <v-text-field v-model="name_album" bg-color="white" append-inner-icon="mdi-folder"
                    :rules="validationNameAlbum" density="compact" clearable label="ป้อนชื่อ Album " variant="outlined"
                    single-line :readonly="loading" name="name_album" type="text">
                  </v-text-field><br>
                  <div class="d-flex justify-center" min-width="20">
                    <v-btn rounded="pill" color="success" min-width="20" :disabled="!form" :loading="loading" block
                      size="large" type="submit" variant="elevated" @click="dialog_create_album = false">สร้าง</v-btn>
                  </div>
                </v-card-text>
              </v-card-text>
            </v-card>
          </v-form>
        </v-dialog>
      </v-btn>
    </div> -->

    <!-- ///////////////// create dialog album -->
    <div class="d-flex pl-5 pr-5">
      <v-span class="text-body-2 font-weight-bold pt-2 text-center">COLLECTION</v-span>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog_create_album" persistent :width="size_dialog">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="blue text-caption" prepend-icon="mdi-plus"> Collection</v-btn>
        </template>
        <v-card class="rounded-lg text-center">
          <v-card color="weserveyellow pa-3 rounded-0">
            <span class="text-body-2 ma-2 ">Create Collection</span>
          </v-card>
          <v-card class="rounded-0" >
            <v-form v-model="form" @submit.prevent="onSubmit">
              <v-card-text>
                <v-text-field v-model="name_album" bg-color="white" prepend-inner-icon="mdi-folder"
                  :rules="validationNameAlbum" density="compact" clearable label="Please enter Collection "
                  variant="outlined" :readonly="loading" name="name_album" hide-details type="text">
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="text" @click="dialog_create_album = false">
                  <span class="text-caption">Close</span>
                </v-btn>
                <v-btn color="success" min-width="20" :disabled="!form" :loading="loading" type="submit" variant="text"
                  @click="dialog_create_album = false">
                  <span class="text-caption">Create</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-card>

      </v-dialog>
    </div>
        <!-- แจ้งเตือน alert -->
        <div v-if="this.Alert == 1" class="pr-5 pl-5 pt-2">
      <v-alert density="comfortable" type="success" variant="tonal">
        Create Collection <strong>success</strong>
      </v-alert>
    </div>
    <div v-if="this.Alert == 2" class="pr-5 pl-5 pt-2">
      <v-alert density="comfortable" type="success" variant="tonal">
        Update Collection <strong>success</strong>
      </v-alert>
    </div>
    <div v-if="this.Alert == 3" class="pr-5 pl-5 pt-2">
      <v-alert density="comfortable" type="success" variant="tonal">
        Delete Collection <strong>success</strong>
      </v-alert>
    </div>

    <!-- show card name album -->
    <div class="pl-5 pr-5 mt-4 ">
      <!-- <v-card v-for="(item, index) in this.$store.state.get_album" :key="index" class="mb-2">
        <div class="pa-2 ml-2 d-flex ">
          <v-lable class="pa-1">
            <v-icon icon="mdi-folder"> </v-icon>
          </v-lable>
          <label class="pa-1 ml-2">{{ item.name_Album }}</label>
          <v-spacer></v-spacer>
          <v-btn color="weserveyellow" class="me-2" @click="update_album(item.name_Album, item.id)">
            แก้ไข
          </v-btn>
          <v-btn color="red" @click="delete_album(item.id)">ลบ</v-btn>
        </div>
      </v-card> -->

      <!-- dialog update album -->
      <!-- <v-dialog v-model="dialog_update_album" activator="parent">
        <v-form v-model="formupdate" @submit.prevent="onSubmitupdate">
          <v-card min-width="50%" class="rounded-xl">
            <v-card-text>
              <v-card-text>
                <div class="text-weserveback text-center">
                  <h3>update album</h3>{{ album }}{{ id }}
                </div><br>
                <v-text-field v-model="album" bg-color="white" append-inner-icon="mdi-folder"
                  :rules="validationNameAlbum" density="compact" clearable label="ป้อนชื่อ Album " variant="outlined"
                  single-line :readonly="loadingupdate" name="name_album_update" type="text" hint="test">
                </v-text-field><br>
                <div class="d-flex justify-center" min-width="20">
                  <v-btn rounded="pill" color="success" min-width="20" :disabled="!formupdate" :loading="loadingupdate"
                    block size="large" type="submit" variant="elevated"
                    @click="dialog_update_album = false">แก้ไข</v-btn>
                </div>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-form>
      </v-dialog> -->
      <v-dialog v-model="dialog_update_album" persistent :width="size_dialog">
        <template v-slot:activator="{ props }">
          <v-card v-for="(item, index) in this.$store.state.album" :key="index" class="mb-2 rounded-lg">
            <div class="pa-3 ml-2 d-flex ">
              <v-lable class="pa-1">
                <v-icon icon="mdi-folder"> </v-icon>
              </v-lable>
              <label class="text-caption mt-2">{{ item.name_Album }}</label>
              <v-spacer></v-spacer>
              <div class=" mr-3">
                <v-btn color="weserveyellow" size="small" class="mr-2" @click="update_album(item.name_Album, item.id)"
                  v-bind="props"><v-span class="text-caption">Edit</v-span>
                </v-btn>
                <v-btn color="red text-caption" size="small" @click="delete_album(item.id)">Delete</v-btn>
              </div>

            </div>
          </v-card>

        </template>
        <v-card class="rounded-lg text-center">
          <v-card color="weserveyellow pa-3 rounded-0">
            <span class="text-body-2 ma-2 ">Edit Collection</span>
          </v-card>
          <v-card class="rounded-0" >
            <v-form v-model="formupdate" @submit.prevent="onSubmitupdate">
              <v-card-text>
                <v-text-field v-model="album" bg-color="white" prepend-inner-icon="mdi-folder"
                  :rules="validationNameAlbum" density="compact" clearable label="Please enter Collection "
                  variant="outlined" hide-details :readonly="loadingupdate" name="name_album_update" type="text">
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="text" @click="dialog_update_album = false">
                  <span class="text-caption">Close</span>
                </v-btn>
                <v-btn color="success" min-width="20" :disabled="!formupdate" :loading="loadingupdate" type="submit"
                  variant="text" @click="dialog_update_album = false">
                  <span class="text-caption">Update </span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-card>
      </v-dialog>

    </div>

    <v-card  class="text-center pa-10" elevation="0" color="weservegrey" v-if="this.$store.state.album == null " >
      <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
    </v-card>
    <!-- {{ this.$store.state.album }} -->
  </v-app>
</template>

<script>
import create from "@/components/create.vue";
import axios from 'axios'

export default {
  name: 'Album',
  components: { create },
  data() {
    return {
      size_dialog:null,
      newalbum: {},
      checkdialog: 0,
      dialog_create_album: false,
      dialog_update_album: false,
      form: false,
      formupdate: false,
      loading: false,
      loadingupdate: false,
      name_album: '',
      name_album_updat: '',
      album: '',
      id: '',
      Alert: '',
      loadingwait:0,
      validationNameAlbum: [
        v => !!v || 'กรุณาป้อนชื่อ Collection',
      ]
    }
  },
  Alert() {
    setTimeout(() => (this.Alert = 0), 1000)
  },

  watch: {
    // whenever question changes, this function will run
    // Alert() {
    //   setTimeout(() => (this.Alert = 0), 5000)
    // }
  },
  mounted() {
    this.$store.dispatch('getAlbum', this.$store.state.token)
    const ctx = document.getElementById('myChart'); 
    if (this.$vuetify.display.name == "lg" || this.$vuetify.display.name == "xl" || this.$vuetify.display.name == "md") {
      this.size_dialog = '50%'
    } else {
      this.size_dialog = '100%'
    }

  },
  methods: {
    // create album
    onSubmit() {
      if (!this.form) return
      this.loading = true
      this.Alert = 1
      setTimeout(() => (this.loading = false), 5000)
      const token = this.$store.state.token
      const formData = {
        create_by: this.$store.state.get_userlogin.id,
        name_album: this.name_album,
      };
      axios.post('/api/showalbum/', formData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        if (response.data) {
          this.newalbum = response.data.data
          setTimeout(() => (this.Alert = 0), 5000)
          this.$store.dispatch('getAlbum', this.$store.state.token)
          this.$store.dispatch('getstory', this.$store.state.token)
          // window.location.reload();
        }
      })
        .catch(error => {
          console.log(error)
        })
      this.name_album = ''
    },

    // update album
    update_album(album, id) {
      this.album = album
      this.id = id
      console.log("sfdasfsd")
      this.checkdialog = 1
    },
    onSubmitupdate() {
      if (!this.formupdate) return
      this.loading = true
      this.Alert = 2
      setTimeout(() => (this.loading = false), 2000)
      const token = this.$store.state.token
      const formData = {
        create_by: this.$store.state.get_userlogin.id,
        name_album: this.album,
      };
      const id = this.id
      axios.put('/api/showalbum/' + id, formData, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        if (response.data) {
          this.$store.dispatch('getAlbum', this.$store.state.token)
          
          setTimeout(() => (this.Alert = 0), 2000)
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    // delete album
    delete_album(value) {
      this.Alert = 3
      const token = this.$store.state.token
      axios.delete('/api/showalbum/' + value, {
        headers: {
          'Authorization': `Token ${token}`
        }
      }).then(response => {
        if (response.data) {
          console.log(response.data)
          this.$store.dispatch('getAlbum', this.$store.state.token)
          
          setTimeout(() => (this.Alert = 0), 5000)
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
  },
  computed: {
    // ...mapActions(['get_album']),

    // checkjson(){
    //   return this.Json.filter(Json => Json.id == 64)
    // }

  },


}
</script>
<style>
.material-symbols-rounded {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>




