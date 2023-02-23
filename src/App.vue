<template>
  <v-app>
    <div v-if="this.$store.state.isAuthenticated">
      <!-- navbar ด้านข้างซ้าย -->
      <v-navigation-drawer v-model="drawer" app style="background-color: #0d0d0b" :border="0" :temporary="opendrawer"
        width="200">
        <v-list-item><br />
          <v-img alt="Vue logo" class="logo" src="@/assets/weserveLogo.png" max-height="100" max-width="165" />
        </v-list-item>
        <v-list-item>
          <v-progress-linear model-value="100" color="weserveyellow" height="1" rounded></v-progress-linear>
          <!-- <v-progress-linear indeterminate color="yellow-darken-2"></v-progress-linear> -->
        </v-list-item>
        <v-list class="pl-6" active-color="weserveyellow" density style="color:gray !important" dense nav>
          <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-view-dashboard" title="DASHBOARD" to="/">
          </v-list-item>
          <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-link" title="URL" to="/URL">
          </v-list-item>
          <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-folder" title="COLLECTION" to="/Album">
          </v-list-item>
          <!-- <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-account-box" title="ACCOUNT">
          </v-list-item> -->
          <!-- <v-spacer></v-spacer>
          <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-logout" title="logout" @click="click_logout">
          </v-list-item> -->
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
              <v-btn block color="weserveyellow rounded-lg" prepend-icon="mdi-logout"  @click="click_logout">
                Logout
              </v-btn>
            </div>
          </template>
      </v-navigation-drawer>

      <!-- bar บน -->
      <v-app-bar app height="50" elevation="0" color="weserveback" prominent>
        <div class="bar" :border="0">
          <div>

          </div>
          <v-btn.rounded-pill class="pa-5">
            <v-icon @click="drawer = !drawer" icon="mdi-menu" color="weserveback" class="pl-2"></v-icon>
          </v-btn.rounded-pill>
          <!-- <v-toolbar-title style="color: #0d0d0b;" class="text-subtitle-1">Short URL</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <!-- <v-btn.rounded-pill >
            <v-icon @click="drawer1 = !drawer1" icon="mdi-bell" color="weserveback" class="mr-2"></v-icon>
          </v-btn.rounded-pill> -->
        </div>
      </v-app-bar>

      <!-- navbar ด้านข้างขวา -->
      <!-- <v-navigation-drawer v-model="drawer1" location="right" color="weservegrey" :border="0" class="mt-2 pr-5" width="150">
        <v-card class="rounded-xl pl-2 pr-2" elevation="0" >
          <v-lable class="text-caption">ประวัติการทำรายการ</v-lable>
          <div v-for="item in this.$store.state.get_story" :key="item.date" link style="color: grey">
            <v-span class="text-caption">คุณ {{ item.name }}</v-span>
            <v-span class="text-caption">{{ item.data }}</v-span>
            <v-lable style="font-size: 0.9vw"></v-lable>
            <h6 style="font-size: 0.9vw">จำนวนการคลิ๊ก </h6>
          </div>
        </v-card>
      </v-navigation-drawer> -->



      <!-- main ตรงกลาง -->
      <v-main style="background: #F5F5F5">
        <div>
          <!-- {{ this.$vuetify.display.name }}{{opendrawer}}{{opendrawer1}} -->
          <router-view></router-view>
        </div>
      </v-main>
    </div>

    <!-- ถ้าไม่ได้ login -->
    <div v-else>
      <v-tabs v-model="tabs" color="weserveyellow" grow>
        <v-tab @click="click1" to="/login"> Login </v-tab>
        <v-tab @click="click2" to="/register"> Sign Up </v-tab>
      </v-tabs>
      <div v-if="check_tabs == 1">
        <Login />
      </div>
      <div v-else>
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import create from "@/components/create.vue";

import axios from "axios";
export default {
  name: "App",
  beforeCreate() {
    this.$store.commit("initalizeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token" + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  components: { Register, Login, create },
  data() {
    return {
      Dashboard: "Dashboard",
      tabs: null,
      check_tabs: 1,
      drawer: false,
      drawer1: false,
      loaded: false,
      loading: false,
      opendrawer: false,
      opendrawer1: true,
    };
  },
  methods: {

    click1() {
      this.check_tabs = 1;
    },
    click2() {
      this.check_tabs = 0;
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    click_logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('res');
      localStorage.removeItem('album');
      this.$router.push('/');
      this.$store.commit('removeToken');
    }
  },
  mounted() {
    this.$store.dispatch('getstory', this.$store.state.token)
    if (this.$vuetify.display.name == "lg" || this.$vuetify.display.name == "xl") {
      this.opendrawer = false;
      this.opendrawer1 = true;
    } else {
      this.opendrawer = true;
      this.opendrawer1 = false;
    }
  },
  computed: {
    // nav1: function () {
    //   this.nav = "Dashboard"
    //   return this.nav
    // },

  },
};
</script>

<style>
.v-tab.withoutupercase {
  text-transform: none !important;
}

.bar {
  display: flex;
  /* ทำให้ต่อกัน */
  width: 100%;
  height: 100%;
  /* ให้กว้างที่สุด */
  background-color: #e1e8eb;
  border-radius: 40px 0 0 0;
  align-items: center;
}

.leftcard {
  border-radius: 40px 40px 40px 40px;
  margin-right: 10%;
  margin-left: 10%;
}
</style>