
<template>
    <v-app>
        <div>
            <div v-if="response_login.message === 'email already applied'" class="mr-5 ml-5 mt-2">
                <v-alert density="comfortable" type="warning" variant="tonal">
                    <span>email นี้มีผู้ใช้แล้ว</span>
                </v-alert>
            </div>
            <div v-if="response_login.message === 'username already applied'" class="mr-5 ml-5 mt-2">
                <v-alert density="comfortable" type="warning" variant="tonal">
                    <span>username นี้มีผู้ใช้แล้ว</span>
                </v-alert>
            </div>
            <v-container class="grey lighten-5" v-if="bigorsmall == 0">
                <v-card class="pa-0" elevation="0">
                    <v-row no-gutters>
                        <v-col v-for="n in 2" :key="n" cols="12" sm="6">
                            <v-card v-if="(n == 1)" outlined tile elevation="0" color="weservegrey"
                                class="pl-10 pt-10 pb-10 " style="border-radius: 20px 0px 0px 20px;">
                                <v-card color="withe" style="border-radius: 20px 0px 0px 20px;" elevation="6"
                                    height="410px" class="pl-4"><br>
                                    <v-card-title class="text-center">
                                        Sign Up
                                    </v-card-title>
                                    <v-card-title>
                                        <v-form v-model="form" @submit.prevent="onSubmit">
                                            <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable
                                                :rules="NameEmail" label="email" variant="underlined" type="email"
                                                name="email"></v-text-field>

                                            <v-text-field v-model="username" :readonly="loading" clearable
                                                :rules="[(v) => !!v || 'กรุณาป้อน username']" label="username"
                                                variant="underlined" type="text" name="username"></v-text-field>
                                            <!-- placeholder="Username"  -->

                                            <v-text-field v-model="password" :readonly="loading" class="mb-2" clearable
                                                :rules="Namepassword" label="password" :value="password"
                                                variant="underlined" name="password" autocomplete="current-password"
                                                hint="password คุณผ่าน" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'"></v-text-field>
                                            <!-- <v-btn variant="text" size="x-small" color="bule" to="/login">
                                                Login
                                            </v-btn> -->
                                            <v-btn :disabled="!form" :loading="loading" block color="success"
                                                size="large" type="submit" variant="elevated">
                                                Sign Up
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
            <v-container class="grey lighten-5" v-else>
                <v-card class="pa-7 rounded-xl" elevation="7" color="weservegrey">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-card class="rounded-xl">
                                <v-card-title class="text-center">
                                    Sign Up
                                </v-card-title>
                                <v-card-title>
                                    <v-form v-model="form" @submit.prevent="onSubmit">
                                        <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable
                                            :rules="NameEmail" label="email" variant="underlined" type="email"
                                            name="email"></v-text-field>

                                        <v-text-field v-model="username" :readonly="loading" clearable
                                            :rules="[(v) => !!v || 'กรุณาป้อน username']" label="username"
                                            variant="underlined" type="text" name="username"></v-text-field>
                                        <!-- placeholder="Username"  -->

                                        <v-text-field v-model="password" :readonly="loading" class="mb-2" clearable
                                            :rules="Namepassword" label="password" :value="password"
                                            variant="underlined" name="password" autocomplete="current-password"
                                            hint="password คุณผ่าน" :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="() => (value = !value)"
                                            :type="value ? 'password' : 'text'"></v-text-field>
                                        <!-- <v-btn variant="text" size="x-small" color="bule" to="/login">
                                                Login
                                            </v-btn> -->
                                        <v-btn :disabled="!form" :loading="loading" block color="success" size="large"
                                            type="submit" variant="elevated">
                                            Sign Up
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
                            <v-card class="rounded-xl">
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
    name: 'register',
    data: () => ({
        form: false,
        // Email: null,
        // Username: null,
        // Password: null,
        email: '',
        username: '',
        password: '',
        loading: false,
        value: true,
        response_login: {},
        NameEmail: [
            v => !!v || 'กรุณาป้อน Email',
            v => /.+@.+\..+/.test(v) || 'E-mail',
        ],
        Namepassword: [
            v => !!v || "กรุณาป้อน Password",
            // v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || "Min. 8 characters with at least one capital letter, a number and a special character."
            v => /^(?=.{6,})/.test(v) || "มี 6 ตัวอักษร"
        ],
        bigorsmall: null

    }),
    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 5000)
            const formData = {
                email: this.email,
                username: this.username,
                password: this.password,
            };
            axios.post('/api/users/', formData).then(response => {
                this.response_login = response.data
                console.log(this.response_login.message)
                if (this.response_login.message === '') {
                    console.log("srifong")
                    this.$router.push('/login');
                }
            })
                .catch(error => {
                    console.log(error)
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