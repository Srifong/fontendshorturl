import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    token: "",
    isAuthenticated: false,
    get_album: [],
    get_url: null,
    chenk_url:null,
    get_userlogin: [],
    album: null,
    getsum_url: [],
    get_id_shorturl: null,
    get_id_url:[],
  },
  getters: {},
  mutations: {
    initalizeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        state.get_userlogin = JSON.parse(localStorage.getItem("res"));
        state.album = JSON.parse(localStorage.getItem("album"));
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.get_url = "";
      state.token = "";
      state.isAuthenticated = false;
      getsum_url = "";
      album = "";
      get_album = "";
      get_userlogin = "";
    },
    removeurlid(state){
      state.get_id_url = "";
      state.getsum_url = "";
    },

    addgetalbum(state, get_album) {
      state.get_album = get_album;
      state.album = JSON.parse(localStorage.getItem("album"));
    },
    addgeturl(state, get_url) {
      state.get_url = get_url;
    },
    addchenkurl(state, chenk_url) {
      state.chenk_url = chenk_url;
    },
    addgetsumurl(state, getsum_url) {
      state.getsum_url = getsum_url;
    },
    addgetidshorturl(state, id_shorurl) {
      state.get_id_shorturl = id_shorurl;
    },
    addgeturlid(state, id) {
      state.get_id_url = id;
    },
  },


  actions: {
    getAlbum(commit, token) {
      axios
        .get("/api/showalbum/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          let get_album = res.data;
          if (get_album.message === "") {
            let get_album = null;
            this.commit("addgetalbum", get_album);
          } else {
            localStorage.setItem("album", JSON.stringify(res.data));
            this.commit("addgetalbum", get_album);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUrl(commit, token) {
      axios
        .get("/api/showurl/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res,222222222222222222222)
          let get_url = res.data;
          if (get_url.message === "") {
            let get_url = null;
            let chenk_url = 'no';
            this.commit("addchenkurl",chenk_url)
            this.commit("addgeturl", get_url);
          } else {
            let chenk_url = null;
            this.commit("addchenkurl",chenk_url)
            this.commit("addgeturl", get_url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSumUrl(commit, token) {
      axios
        .get("/api/sumurl/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          let get = res.data;
          this.commit("addgetsumurl", get);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    geturlid(commit, token) {
      let t = sessionStorage.getItem("showurlid");
      if (t) {
        axios
          .get("/api/showurlid/" + t, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            sessionStorage.setItem("urlid", JSON.stringify(res.data))
            let get = res.data;
            this.commit("addgeturlid", get);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  modules: {},
});
