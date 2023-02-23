<template>
  <div>
    <h1>{{ posts }}</h1>
    <v-card v-for="post in posts" :key="post.id">
      <label>{{ post.id }}</label>
    </v-card>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
    }
  },

  methods: {
    geturl() {
      axios.get('http://192.168.1.2:8000/api/showcount/')
        .then(response => this.posts = response.data)
        (console.log(response))
    }
  }
}

</script>
