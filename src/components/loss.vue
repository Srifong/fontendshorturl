<template>
    <v-app>
        <div v-if="this.$store.state.isAuthenticated">
            <v-navigation-drawer v-model="drawer" app style="background-color: #0d0d0b" mini-variant-width="110"
                :border="0" mini-variant>
                <v-list-item><br />
                    <v-img alt="Vue logo" class="logo" src="@/assets/weserveLogo.png" max-height="150"
                        max-width="220" />
                </v-list-item>
                <!-- <v-divider></v-divider> -->
                <v-list active-color="white" density style="color: #ffc107 !important">
                    <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-view-dashboard" value="Dashboard"
                        title="Dashboard" to="/dashboard">
                    </v-list-item>
                    <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-link" title="URL" value="URL" to="/URL">
                    </v-list-item>
                    <v-list-item class="pa-4 rounded-s-xl" prepend-icon="mdi-folder" title="Album" value="Album"
                        to="/Album">
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <!-- <div class="backgroundbar"> -->
            <v-app-bar app height="50" elevation="0" color="weserveback">
                <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title >Application</v-toolbar-title> -->
                <div class="bar" :border="0">
                    <!-- <div style="width:100%;">
            <v-icon @click="drawer = !drawer" icon="mdi-menu" color="weserveback"></v-icon>
            <v-icon @click="drawer1 = !drawer1" icon="mdi-menu" color="weserveback"></v-icon>
          </div> -->
                    <v-btn.rounded-pill class="pa-5">
                        <v-icon @click="drawer = !drawer" icon="mdi-menu" color="weserveback" class="pl-2"></v-icon>
                    </v-btn.rounded-pill>
                    <v-toolbar-title style="color:#0d0d0b; font-size:2vw">Short URL</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn.rounded-pill class="pa-2">
                        <v-icon @click="drawer1 = !drawer1" icon="mdi-bell" color="weserveback"></v-icon>
                    </v-btn.rounded-pill>
                    <v-btn.rounded-pill class="pa-2">
                        <v-icon icon="mdi-account-box" color="weserveback" class="pr-5"></v-icon>
                    </v-btn.rounded-pill>

                    <!-- <div style="margin-left: 15px; color: #0d0d0b"></div> -->
                    <!-- <div style="margin-left: 15px; width: 60%; margin-right: 15px">
            <v-card style="border-radius: 50px">
              <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Search "
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
              ></v-text-field>
            </v-card>
          </div> -->
                </div>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer1" location="right" width="200" color="weservegrey" :border="0"
                permanent class="mt-2">
                <v-card class="leftcard pa-3 rounded-xl" elevation="0">
                    <span style="color:blue;font-size:1vw">คลิ๊กล่าสุด </span>
                    <div v-for="item in items" :key="item.title" link style="color:grey">
                        <label style="font-size:0.9vw">{{ item.title }}</label>
                        <h6 style="font-size:0.9vw">ถูกคลิ๊กเมื่อ{{ item.date }}</h6>
                        <!-- <v-divider></v-divider> -->
                    </div>
                </v-card><br>
                <v-card class="leftcard pa-3 rounded-xl" elevation="0">
                    <v-lable style="color:blue;font-size:1vw">ยอดนิยม</v-lable>
                    <div v-for="item in rank" :key="item.title" link style="color:grey">
                        <v-lable style="font-size:0.9vw">{{ item.title }}</v-lable>
                        <h6 style="font-size:0.9vw">จำนวนการคลิ๊ก {{ item.sum }}</h6>
                    </div>
                </v-card>
            </v-navigation-drawer>
            <v-main style="background: #e1e8eb">

                <div>
                    {{ this.$vuetify.display.name }}
                    <router-view></router-view>
                </div>
            </v-main>
        </div>
        <div v-else>
            <!-- <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col v-for="n in 2" :key="n" cols="12" sm="4">
              <v-card class="pa-2" outlined tile>
                One of three columns
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->

            <div style="background-color:red">
                <div>
                    <h1>1</h1>
                </div>
            </div>

            <label>
                <router-link to="/login">login</router-link>
            </label>
            <label>
                <router-link to="/register">register</router-link>
            </label>
            <h1>ก่อนเข้าระบบ</h1>
            <!-- {{ $store.state }} -->
            <router-view />
        </div>
    </v-app>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "App",
    beforeCreate() {
        this.$store.commit("initalizeStore");
        const token = this.$store.state.token;
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Token" + token;
        }
        else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },
    data: () => ({
        drawer: false,
        drawer1: null,
        loaded: false,
        loading: false,
        items: [
            { title: "www.google.com/uihlhf", date: "1 / 2 / 2565" },
            { title: "www.google.com/dkfhdu", date: "1 / 2 / 2565" },
            { title: "www.google.com/dkfhdu", date: "1 / 2 / 2565" },
            { title: "www.google.com/dkfhdu", date: "1 / 2 / 2565" },
        ],
        rank: [
            { title: "www.google.com/sdfdas", sum: 300 },
            { title: "www.youtueb.com/sdfsdf", sum: 300 },
            { title: "www.facebook.com/sdfsdf", sum: 300 },
            { title: "www.youtueb.com/sdfsdf", sum: 300 },
        ],
    }),
    // notification: () => ({
    //   items: [
    //     { title: 'www.google.com', date: 1 / 2 / 2565 },
    //     { title: 'www.google.com', date: 1 / 2 / 2565 },
    //     { title: 'www.google.com', date: 1 / 2 / 2565 },
    //   ],
    // }),
    methods: {
        onClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.loaded = true;
            }, 2000);
        },
    },
    mounted() {
        if (this.$vuetify.display.name == "lg") {
            this.drawer = true;
        }
    },
};
</script>
  
<style >
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
  