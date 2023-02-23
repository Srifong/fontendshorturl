<!-- <template>
    <v-app>
        <div class="login">
            <v-btn to="/register" >singup</v-btn>
            <h1>login</h1>
            <form @submit.prevent="submitForm" style="background-color:red">
                <input type="text" name="username" v-model="username">
                <input type="password" name="password" v-model="password">
                <button type="submit">login</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            // username: '',
            // password: '',
            data: []
        }
    },
    methods: {
        submitForm() {
            const formData = {
                username: this.username,
                password: this.password
            };
            axios.post('/api/login/',formData).then(response => {
                console.log(response)
                console.log("srifong")
                const token = response.data.token
                this.$store.commit('setToken',token)
                axios.defaults.headers.common['Authorization'] = "Token"+token
                localStorage.setItem("token",token)
                this.$router.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script> -->


<template>
    <v-app>
        <div>
            <div v-if="Alert == 1" class="mr-5 ml-5 mt-2">
                <v-alert density="comfortable" type="warning" variant="tonal">
                    <span>กรุณาป้อน username และ password ให้ถูกต้อง</span>
                </v-alert>
            </div>
            <v-container class="grey lighten-5 " v-if="bigorsmall == 0">
                <v-card class="pa-0" elevation="0">
                    <v-row no-gutters>
                        <v-col v-for="n in 2" :key="n" cols="12" sm="6">
                            <v-card v-if="(n == 1)" outlined tile elevation="0" color="weservegrey"
                                class="pl-10 pt-10 pb-10 " style="border-radius: 20px 0px 0px 20px;">
                                <v-card color="withe" style="border-radius: 20px 0px 0px 20px;" elevation="6"
                                    height="410px" class="pl-4"><br><br>
                                    <v-card-title class="text-center">
                                        Login
                                    </v-card-title>
                                    <v-card-title>
                                        <v-form v-model="form" @submit.prevent="onSubmit">
                                            <v-text-field class="mb-2" v-model="username" :readonly="loading" clearable
                                                :rules="[(v) => !!v || 'กรุณาป้อน Username']" label="username"
                                                variant="underlined" name="username">
                                            </v-text-field>
                                            <v-text-field v-model="password" :readonly="loading" clearable
                                                :rules="[(v) => !!v || 'กรุณาป้อน password']" label="password"
                                                variant="underlined" name="password" autocomplete="current-password"
                                                :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'">
                                            </v-text-field><br>

                                            <v-btn :disabled="!form" :loading="loading" block color="success"
                                                size="large" type="submit" variant="elevated">
                                                Login
                                            </v-btn>
                                        </v-form>
                                    </v-card-title>
                                </v-card>
                            </v-card>
                            <v-card v-if="(n == 2)" outlined tile elevation="0" color="weserveyellow"
                                class="pr-10 pt-10 pb-10 " style="border-radius: 0px 20px 20px 0px;">
                                <v-card color="white" style="border-radius: 0px 20px 20px 0px;" elevation="6">
                                    <v-img height="410px" src="@/assets/yellow.jpg"></v-img>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
            <v-container  v-else>
                <v-card class="pa-7 rounded-xl" elevation="7" color="weservegrey">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-card  class="rounded-xl">
                                <v-card-title class="text-center">
                                        Login
                                    </v-card-title>
                                    <v-card-title>
                                        <v-form v-model="form" @submit.prevent="onSubmit">
                                            <v-text-field class="mb-2" v-model="username" :readonly="loading" clearable
                                                :rules="[(v) => !!v || 'กรุณาป้อน Username']" label="username"
                                                variant="underlined" name="username">
                                            </v-text-field>
                                            <v-text-field v-model="password" :readonly="loading" clearable
                                                :rules="[(v) => !!v || 'กรุณาป้อน password']" label="password"
                                                variant="underlined" name="password" autocomplete="current-password"
                                                :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'">
                                            </v-text-field>

                                            <v-btn :disabled="!form" :loading="loading" block color="success"
                                                size="large" type="submit" variant="elevated">
                                                Login
                                            </v-btn><br>
                                        </v-form>
                                    </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card><br>
                <v-card class="pa-7 rounded-xl" elevation="7" color="weserveyellow">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-card  class="rounded-xl">
                                <v-img height="410px" src="@/assets/yellow.jpg"></v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </div>
    </v-app>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'login',
    data: () => ({
        form: false,
        username: '',
        password: '',
        loading: false,
        value: true,
        json: null,
        Alert: 0,
        bigorsmall: null,

    }),
    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 20000)

            const formData = {
                username: this.username,
                password: this.password
            };
            axios.post('/api/login/', formData).then(response => {
                console.log(response)
                const res = response.data
                const token = response.data.token
                this.$store.commit('setToken', token)
                axios.defaults.headers.common['Authorization'] = "Token" + token
                localStorage.setItem("token", token)
                localStorage.setItem("res", JSON.stringify(res))
                localStorage.removeItem('album');
                this.$store.commit('removeurlid');
                this.$router.push('/')
            })
                .catch(error => {
                    console.log(error)
                    this.Alert = 1
                })
        },
    },
    mounted() {
        this.$store.dispatch('getstory', this.$store.state.token)
        if (this.$vuetify.display.name == "lg" || this.$vuetify.display.name == "xl") {
            this.bigorsmall = 0
        } else {
            this.bigorsmall = 1
        }
    },
}
</script>