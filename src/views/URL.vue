<template>
  <v-app style="background: #e1e8eb" v-if="this.$store.state.isAuthenticated">
    <v-span class="text-body-2 font-weight-bold mt-2 pl-5 mb-2">URL</v-span>
    <create />
    <div class="pl-5 mt-2 pr-5 d-flex">
      <v-card class="rounded-lg" width="50%" v-if="select.name_Album === 'All Collection'">
        <v-text-field v-model="searchurl1" density="compact" variant="solo" label="Search your URL"
          append-inner-icon="mdi-magnify" single-line hide-details>
        </v-text-field>
      </v-card>
      <v-card class="rounded-lg" width="50%" v-else-if="select.id">
        <v-text-field v-model="searchurl2" density="compact" variant="solo" label="Search your URL "
          append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
      </v-card>
      <v-spacer></v-spacer>
      <!-- search Album -->
      <v-label>
        <!-- <v-btn prepend-icon="mdi-delete" variant="plain">
            </v-btn> -->
      </v-label>
      <!-- select album -->
      <v-card class="rounded-lg" width="30%">
        <v-select v-model="select" :items="select_album" item-title="name_Album" item-value="id" density="compact"
          label="select" variant="solo" persistent-hint return-object single-line hide-details>
        </v-select></v-card>

    </div>

    <!-- show -->

    <!-- {{ this.$store.state.chenk_url }} -->
    <div v-if="this.$store.state.get_url == null && this.$store.state.chenk_url == null">
      <br>
      <v-card class="text-center pa-10" elevation="0" color="weservegrey">
        <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
      </v-card>
    </div>
    <div v-else-if="this.$store.state.chenk_url == 'no'">
      <v-card class="pa-4 ml-5 mr-5 mb-5 mt-3 text-center">
        <span class="text-body-1">No Information </span>
      </v-card>
    </div>
    <div v-else>
      <!-- แจ้งเตือน -->
      <div class="pl-5 pr-5 pt-3 " v-if="Alert == 1">
        <v-alert density="comfortable" type="success" variant="tonal">
          Delete URL <strong>Success</strong>
        </v-alert>
      </div>

      <!-- if ค้นหา show all -->
      <div v-if="check_loading == 0">
        <br>
        <v-card class="text-center pa-10" elevation="0" color="weservegrey">
          <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
        </v-card>
      </div>
      <div v-else-if="check_loading == 2">
        <v-card class="pa-4 ml-5 mr-5 mb-5 mt-3 text-center">
          <span class="text-body-1">No Information </span>
        </v-card>
      </div>
      <div v-if="select.name_Album === 'All Collection'">
        <v-card class=" mt-3 mr-5 ml-5 pl-2 pr-2 rounded-lg pl-1" v-for="item in filterurl1 " :key="item.original_link"
          :search="search">
          <v-row no-gutters style=" align-items: center; justify-content: center">
            <v-col cols="1" class="pl-1">
              <v-sheet>
                <v-img :src="p + item.original_link"></v-img>
              </v-sheet>
            </v-col>
            <v-col cols="8">
              <v-sheet class="pl-2 mt-6 ">
                <v-text-field class="text-caption" density="compact" variant="outlined" :model-value="item.original_link"
                  readonly></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="3">
              <v-sheet class="text-center pl-2">
                <v-span class="text-body-1  ">{{ item.number_of_clicks }}</v-span>
                <span class="text-black text-body-2 ml-3">CLICK</span>
                <!-- <v-btn class="text-body-1" color="bule" variant="plain" size="large" > CLICK</v-btn> -->
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters class="pb-2">
            <v-col cols="9">
              <v-sheet class="pl-10">
                <v-span class="text-caption ">{{ item.shortened_link }}</v-span>
                <v-btn @click="copy(item.shortened_link)" color="bule" class="text-caption" variant="text" size="x-small">
                  Copy </v-btn>
                <v-icon v-if="item.ex_date_no_play == 0" color="green">mdi-circle-medium</v-icon>
                <v-icon v-if="item.ex_date_no_play == 1" color="grey">mdi-circle-medium</v-icon>
                <v-span v-if="item.ex_date_no_play == 0" class="text-caption text-black mr-2">
                  Active
                </v-span>
                <v-span v-if="item.ex_date_no_play == 1" class="text-caption text-black mr-2">
                  inactive
                </v-span>
                <!-- <v-label class="text-caption "> <v-icon size="x-small" icon="mdi-clock-outline" color="grey"></v-icon>{{
                    item.date_now
                  }}</v-label> -->
              </v-sheet>
            </v-col>
            <v-col cols="3" class="text-center">
              <!-- <div v-if="item.ex_date != item.date_now"> -->
              <v-sheet class="pl-2">
                <!-- <v-label class="text-caption">หมดอายุวันที่</v-label> -->
                <!-- <v-btn  size="x-small" variant="plain" prepend-icon="mdi-circle-medium" color="green"> -->
                <v-btn @click="search_id_url(item.id)" elevation="1" size="small" prepend-icon="mdi-eye" color="green">
                  <v-span class="text-caption ">
                    View
                  </v-span>
                </v-btn>
                <!-- <v-label class="text-caption ml-3"> {{ item.ex_date }}</v-label> -->
              </v-sheet>
              <!-- </div> -->
            </v-col>
          </v-row>
        </v-card>
      </div>

      <!-- else ไม่ใช่ ค้นหา search album -->
      <div v-else-if="select.id">
        <v-card class=" mt-2 mr-5 ml-5 rounded-lg pl-1" v-for="item in filterurl2 " :key="item.original_link" link>
          <v-row no-gutters style=" align-items: center; justify-content: center">
            <v-col cols="1" class="pl-1">
              <v-sheet>
                <v-img :src="p + item.original_link"></v-img>
              </v-sheet>
            </v-col>
            <v-col cols="8">
              <v-sheet class="pl-2 mt-6 ">
                <v-text-field class="text-caption" density="compact" variant="outlined" :model-value="item.original_link"
                  readonly></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="3">
              <v-sheet class="text-center">
                <v-span class="text-body-1 pl-2">{{ item.number_of_clicks }}</v-span>
                <v-btn class="text-body-1" color="bule" variant="plain" size="large"> CLICK</v-btn>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters class="pb-2">
            <v-col cols="9">
              <v-sheet class="pl-10">
                <v-span class="text-caption ">{{ item.shortened_link }}</v-span>
                <v-btn @click="copy(item.shortened_link)" color="bule" class="text-caption" variant="text" size="x-small">
                  Copy </v-btn>
                <v-icon v-if="item.ex_date_no_play == 0" color="green">mdi-circle-medium</v-icon>
                <v-icon v-if="item.ex_date_no_play == 1" color="grey">mdi-circle-medium</v-icon>
                <v-span v-if="item.ex_date_no_play == 0" class="text-caption text-black mr-2">
                  Active
                </v-span>
                <v-span v-if="item.ex_date_no_play == 1" class="text-caption text-black mr-2">
                  inactive
                </v-span>
                <!-- <v-label class="text-caption "> <v-icon size="x-small" icon="mdi-clock-outline" color="grey"></v-icon>{{
                    item.date_now
                  }}</v-label> -->
                <!-- <v-text-field class="text-caption" density="compact" variant="underlined" :model-value="item.original_link"
                  disabled></v-text-field> -->
              </v-sheet>
            </v-col>
            <v-col cols="3" class="text-center">
              <div>
                <v-sheet>
                  <v-btn @click="search_id_url(item.id)" elevation="1" size="small" prepend-icon="mdi-eye" color="green">
                    <v-span class="text-caption ">
                      View
                    </v-span>
                  </v-btn>
                </v-sheet>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div><br>
    </div>


    <!-- search collection -->




    <!-- <div>
          <v-pagination v-model="page" :length="6"></v-pagination>
        </div> -->
    <!-- แจ้งเตือน -->

  </v-app>
</template>

<script>
import axios from 'axios'
import create from "@/components/create.vue";

export default {
  name: "URL",
  components: { create },
  data: () => ({
    searchurl1: '',
    searchurl2: '',
    testlen: 0,
    loaded: false,
    type: "",
    select: { name_Album: 'All Collection' },
    album_search: '',
    seartalbum: [],
    // p: 'https://api.statvoo.com/favicon/?url=',
    p: 'https://www.google.com/s2/favicons?sz=64&domain_url=',
    page: 1,
    Alert: 0,
    select_album: [],
    check_loading: 0
  }),
  computed: {
    filterurl1: function () {
      const check = this.$store.state.get_url
      if (check) {
        this.check_loading = 1
        return this.$store.state.get_url.filter((item) => {
          return item.original_link.toLowerCase().match(this.searchurl1.toLowerCase())
        })
      }
    },
    filterurl2: function () {
      const check = this.seartalbum
      if (check) {
        return this.seartalbum.filter((item) => {
          return item.original_link.toLowerCase().match(this.searchurl2.toLowerCase())
        })
      }
    }
  },
  watch: {
    // whenever search changes, this function will run
    select() {
      if (this.select.id) {
        this.albumsearch(this.select.id)
      }
    },
    Alert() {
      setTimeout(() => (this.Alert = 0, sessionStorage.removeItem('deleteurl')), 4000)
    }
  },
  methods: {
    // copy shor url success
    copy(value) {
      try {
        navigator.clipboard.writeText(value)
      } catch (e) {
        throw e
      }
    },
    // search album api to url 
    albumsearch(value) {
      this.check_loading = 0
      this.seartalbum = []
      const token = this.$store.state.token
      axios
        .get("/api/albumsearch/" + value, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          this.seartalbum = res.data
          this.check_loading = 1
          if (res.data.message === "") {
            this.seartalbum = null
            this.check_loading = 2
          }

        })
        .catch((error) => {
          console.log(error);
        });
    },
    // search id url to get url show dashboard url
    search_id_url(id) {
      this.$store.commit('removeurlid');
      sessionStorage.setItem("showurlid", id);
      this.$store.dispatch('geturlid', this.$store.state.token)
      this.$router.push("/searchurl");
    },
  },
  // get api url to show all url view dashboard url
  // computed: {
  //   testlenl: function () {
  //     this.select_album=0
  //     return this.select_album
  //   }
  // },
  mounted() {
    this.$store.dispatch('getAlbum', this.$store.state.token)
    this.$store.dispatch('getUrl', this.$store.state.token)
    const token = this.$store.state.token
    axios
      .get("/api/showalbumURL/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        this.select_album = res.data
      })
      .catch((error) => {
        console.log(error);
      });
    sessionStorage.removeItem('showurlid')
    sessionStorage.removeItem('urlid')
    const checkdelete = sessionStorage.getItem('deleteurl')
    if (checkdelete) {
      this.Alert = 1
    }
  },

};
</script>
<style>
.v-text-field label {
  margin: 0.3em;
  font-size: 0.8em;
}
</style>


