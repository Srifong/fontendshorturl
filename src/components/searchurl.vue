
<template>
    <v-app style="background: #e1e8eb" v-if="this.$store.state.isAuthenticated">
        <v-span class="text-body-2 font-weight-bold mt-2 pl-5 mb-2">View Url</v-span>
        <div v-if="this.$store.state.get_id_url.length <= 0">
            <v-card class="text-center pa-10" elevation="0" color="weservegrey">
                <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
            </v-card>
        </div>
        <div v-else>
            <div class="d-flex align-center mr-5 pl-2">
                <v-btn size="small" color="bule" variant="text" icon="mdi-chevron-left" @click="back_view_url"
                    to="/URL"></v-btn>
                <v-spacer></v-spacer>
                <v-btn color="bule" variant="text" @click="story">History</v-btn>
            </div>

            <!-- แจ้งเตือน -->
            <div class="pl-5 pr-5 pt-3 " v-if="Alert == 1">
                <v-alert density="comfortable" type="success" variant="tonal">
                    Update URL <strong>succeed</strong>
                </v-alert>
            </div>

            <!-- show สรุป -->
            <v-container>
                <v-row no-gutters row wrap>
                    <v-col order="first" xs12>
                        <v-card class="rounded-lg ma-2" min-height="150px">
                            <v-sheet>
                                <v-card color="weserveback" class="rounded-0 pa-2 text-caption">Clicks Today</v-card>
                                <div style="padding: 50px ;">
                                    <div class="text-center">
                                        <span class="text-body-1">{{
                                            this.$store.state.get_id_url.sum_count_day
                                        }}</span>
                                    </div>

                                </div>
                            </v-sheet>
                        </v-card>
                    </v-col>
                    <v-col xs12>
                        <v-card class="rounded-lg ma-2" min-height="150px">
                            <v-sheet>
                                <v-card color="weserveback" class="rounded-0 pa-2 text-caption">All Clicks</v-card>
                                <div style="padding: 50px ;">
                                    <div class="text-center">
                                        <span class="text-body-1">{{
                                            this.$store.state.get_id_url.sum_count_all
                                        }}</span>
                                    </div>

                                </div>

                            </v-sheet>
                        </v-card>
                    </v-col>
                    <v-col order="last" xs12>
                        <v-card class="rounded-lg ma-2 " min-height="150px">
                            <v-sheet>
                                <v-card color="weserveback" class="rounded-0 pa-2  text-caption ">Clicks Today</v-card>
                                <div class="d-flex justify-center ma-1">
                                    <v-img max-height="91px" max-width="91px"
                                        :src="g + this.$store.state.get_id_url.code" />
                                </div>
                                <div class="text-center"> <v-btn variant="text" size="x-small" color="bule"
                                        class="text-caption" :href="g + this.$store.state.get_id_url.code" target="_blank"
                                        rel="noreferrer">
                                        Download
                                    </v-btn></div>

                                <v-card>
                                    <!-- <v-row>
                                            <v-col cols="6" class="text-center">
                                                <v-img :src="g + this.$store.state.get_id_url.code" />
                                            </v-col>
                                            <v-col cols="6" class="d-flex align-center">
                                                <v-btn variant="text" size="x-small" color="bule" class="text-caption"
                                                    :href="g + this.$store.state.get_id_url.code" target="_blank"
                                                    rel="noreferrer">
                                                    Download
                                                </v-btn>
                                            </v-col>
                                        </v-row> -->
                                    <v-spacer></v-spacer>

                                </v-card>
                            </v-sheet>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <!-- รายละเอียด url -->
            <v-card class=" mt-2 mr-5 ml-5 rounded-lg pl-1 pa-2 ">
                <v-row no-gutters style=" align-items: center; justify-content: center">
                    <v-col cols="1" class="pl-1">
                        <v-sheet>
                            <v-img :src="p + this.$store.state.get_id_url.original_link"></v-img>
                        </v-sheet>
                    </v-col>
                    <v-col cols="8">
                        <v-sheet class="pl-2 mt-6 mb-1">
                            <v-text-field class="text-caption" density="compact" variant="outlined"
                                :model-value="this.$store.state.get_id_url.original_link" readonly></v-text-field>
                            <v-span class="text-caption ">{{ this.$store.state.get_id_url.shortened_link }}</v-span>
                            <v-btn @click="copy(this.$store.state.get_id_url.shortened_link)" color="bule"
                                class="text-caption mr-2" variant="text" size="x-small">
                                Copy </v-btn>
                            <v-icon v-if="this.$store.state.get_id_url.ex_date_no_play == 0"
                                color="green">mdi-circle-medium</v-icon>
                            <v-icon v-if="this.$store.state.get_id_url.ex_date_no_play == 1"
                                color="grey">mdi-circle-medium</v-icon>
                            <v-span v-if="this.$store.state.get_id_url.ex_date_no_play == 0"
                                class="text-caption text-black mr-2">
                                Active
                            </v-span>
                            <v-span v-if="this.$store.state.get_id_url.ex_date_no_play == 1"
                                class="text-caption text-black mr-2">
                                inactive
                            </v-span>
                            <v-label class="text-caption ">
                                create
                                {{
                                    this.$store.state.get_id_url.date_now
                                }}</v-label>

                            <v-label class="text-caption ml-3"
                                v-if="this.$store.state.get_id_url.check_date == 1">End Date
                                {{
                                    this.$store.state.get_id_url.ex_date
                                }}</v-label>
                            <v-label class="text-caption ml-3"
                                v-else-if="this.$store.state.get_id_url.data_now == this.$store.state.get_id_url.ex_data">No
                                End Date</v-label>
                            <!-- <v-label class="text-caption ml-2">{{ this.$store.state.get_id_url.ex_date }}</v-label> -->
                        </v-sheet>
                    </v-col>
                    <v-col cols="3">
                        <v-sheet class="text-center ">
                            <v-dialog v-model="dialog_update_advace" persistent :width="size_dialog_advace">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" class="text-body-1  ma-1" color="weserveyellow" v-bind="props"
                                        @click="chang_select_advace">
                                        <span class="text-caption">Update</span>
                                    </v-btn>

                                </template>
                                <v-card class="rounded-lg ">
                                    <v-card color="weserveyellow pa-3 rounded-0">
                                        <span class="text-body-2 ma-2 ">Update URL</span>
                                    </v-card>
                                    <v-card-text>
                                        <v-form v-model="form_update_advace" @submit.prevent="urlupdate">
                                            <v-card-text>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="url_advace" bg-color="white"
                                                            append-inner-icon="mdi-link-variant" :rules="validationURl"
                                                            density="compact" clearable label="Please enter URL "
                                                            counter="255" variant="outlined" hide-details
                                                            :readonly="loading_normal" name="url" type="url">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-select v-model="select" :items="this.$store.state.album"
                                                            item-title="name_Album" item-value="id" density="compact"
                                                            label="Select Collection" variant="outlined" persistent-hint
                                                            return-object hide-details name="name_album"
                                                            :hint="`${select.name_Album}, ${select.id}`"></v-select>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="key" bg-color="white"
                                                            append-inner-icon="mdi-password" density="compact" clearable
                                                            label="Please enter keyword " counter="255" variant="outlined"
                                                            hide-details :readonly="loading_normal" name="key"
                                                            type="url"></v-text-field>
                                                    </v-col>
                                                    <!-- <v-col cols="12">
                                                        <v-text-field v-model="ex_date" mode="dateTime" :columns="2"
                                                            bg-color="white" density="compact" clearable :min="timestamp"
                                                            label="Choose an expiration date " variant="outlined"
                                                            hide-details :readonly="loading_normal" name="ex_date"
                                                            type="date"></v-text-field>
                                                    </v-col> -->
                                                    <v-col cols="12" v-if="checkbox1 == true">
                                                        <v-text-field v-model="ex_date" mode="dateTime" :columns="2"
                                                            bg-color="white" density="compact" clearable :min="timestamp"
                                                            label="Choose End Date " variant="outlined"
                                                            hide-details :readonly="loading_normal" name="ex_date"
                                                            type="date"></v-text-field>
                                                    </v-col>
                                                    <v-checkbox v-model="checkbox1"> <template v-slot:label>
                                                            <span style="font-size: 0.8em">End Date</span>
                                                        </template></v-checkbox>
                                                </v-row>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="red" variant="text" @click="close_dialog_update_advace">
                                                    <span class="text-caption">Close</span>
                                                </v-btn>
                                                <v-btn color="success" min-width="20" :disabled="!form_update_advace"
                                                    :loading="loading_advace" type="submit" variant="text"
                                                    @click="dialog_update_advace = false">
                                                    <span class="text-caption">Update </span>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-form>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog_delete_advace" persistent :width="size_dialog_advace">
                                <template v-slot:activator="{ props }">
                                    <v-btn size="small" class="text-body-1 ma-1" color="red" v-bind="props">
                                        <span class="text-caption">Delete</span>
                                    </v-btn>

                                </template>
                                <v-card class="rounded-lg">
                                    <v-card color="weserveyellow pa-3 rounded-0 ">
                                        <span class="text-body-2 ma-2 ">Confirm Delete URL</span>
                                    </v-card>
                                    <v-card-text>
                                        <v-row class="pa-3">
                                            <v-col cols="12">
                                                <v-text-field v-model="url_advace" bg-color="white"
                                                    append-inner-icon="mdi-link-variant" :rules="validationURl"
                                                    density="compact" clearable label="ป้อน URL " counter="255"
                                                    variant="outlined" single-line hide-details :readonly="loading_normal"
                                                    name="url" type="url">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <div class="pa-3">
                                            <v-btn color="red" variant="text" @click="dialog_delete_advace = false">
                                                <span class="text-caption">Close</span>
                                            </v-btn>
                                            <v-btn color="success" min-width="20" type="submit" variant="text"
                                                @click="urldelete">
                                                <span class="text-caption">Confirm</span>
                                            </v-btn>
                                        </div>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <!-- <v-btn class="text-body-1" color="red" variant="text" size="large"> ลบ</v-btn> -->
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card><br>
            <!-- {{ url_advace }} -->
            <!-- จบรายละเอียด url -->


            <!-- {{ timestamp }} -->
            <!-- <div><v-btn @click="showdate =1">show</v-btn></div>
                <div v-if="showdate ==1">
                    <DatePicker :min="newdate" v-model="date" mode="dateTime" columns="2" is-range />
                    <p>
                        Date:{{ date }}
                    </p> -->

            <!-- {{ this.$store.state.get_id_url }} -->
            <!-- <a href="#" target="_blank" rel="noreferrer"
                                download="https://storage.cloud.google.com/my_project_short_url_01/images/s0SDURSqr.png">
                                Download
                            </a>
                            <v-btn
                                @click="downloadImg('https://storage.cloud.google.com/my_project_short_url_01/images/s0SDURSqr.png', '12.png')">download</v-btn> -->
            <!-- </div> -->
        </div>
    </v-app>
</template>

<script>
import axios from 'axios'
// import { ref, reactive } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
// const date = ref(new Date())
// date.value.setDate(Number(date.value.getDate()) + 35)
// const range = reactive({
//     start: new Date(),
//     end: date.value
// new Date(2016, 9,  16)
// })


export default {
    components: {
        DatePicker
    },
    name: "searchurl",
    data: () => ({
        showdate: 0,
        selected: '',
        // newdate: new Date("20/1/2023"),
        // date: new Date(2016, 9, 16),
        url: {},
        g: "https://storage.googleapis.com/my_project_short_url_01/images/",
        p: 'https://www.google.com/s2/favicons?sz=64&domain_url=',
        big: 5,
        small: 2,
        size_dialog_advace : '50%',
        select: null,
        form_update_advace: false,
        dialog_update_advace: false,
        dialog_delete_advace: false,
        url_advace: '',
        key: '',
        ex_date: '',
        album: '',
        loading_normal: false,
        id: '',
        Alert: '',
        Alertdelete: '',
        timestamp: '',
        dialog: false,
        checkbox1: false,
    }),
    watch: {
        // whenever question changes, this function will run
        Alert() {
            setTimeout(() => (this.Alert = 0), 5000)
        },
        Alertdelete() {
            setTimeout(() => (this.Alert = 0), 5000)
        }
    },
    // created() {
    //     this.fetchImage();
    // },
    methods: {
        chang_select_advace() {
            const name = this.$store.state.get_id_url.name_Album
            this.select = { name_Album: `${this.$store.state.get_id_url.name_album}`, id: `${this.$store.state.get_id_url.name_album_id}` }
            return this.test()
        },
        cheang_2() {
            this.dialog_update_advace_success = false
        },
        close_dialog_update_advace() {
            this.dialog_update_advace = false
        },
        urlupdate() {
            const token = this.$store.state.token
            const id = this.$store.state.get_id_url.id
            const formData = {
                original_link: this.url_advace,
                name_album: this.select.id,
                key: this.key,
                ex_date: this.ex_date,
                check_date: this.checkbox1,
            };
            axios.put('/api/update/' + id, formData, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                this.$store.dispatch('geturlid', this.$store.state.token)
                this.Alert = 1
            })
                .catch(error => {
                    console.log(error)
                })
        },
        urldelete() {
            this.dialog_delete_advace = false
            const token = this.$store.state.token
            const value = sessionStorage.getItem("showurlid")
            console.log(value, "testdelete")
            axios.delete('/api/delete/' + value, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (response.data) {
                    this.$router.push("/URL");
                    sessionStorage.setItem('deleteurl', value)
                }
            })
                .catch(error => {
                    console.log(error)
                })
        },
        copy(value) {
            try {
                navigator.clipboard.writeText(value)
            } catch (e) {
                throw e
            }
        },
        back_view_url() {
            this.$store.commit('removeurlid');
            this.$router.push('/URL')
        },
        story() {
            this.$router.push('/story')
        },
        // downloadImg(url, fileName) {
        //     var link = document.createElement('a');
        //     link.href = 'https://storage.cloud.google.com/my_project_short_url_01/images/s0SDURSqr.png';
        //     link.download = 'Download.png';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // },
        // async fetchImage() {
        //     try {
        //         // Replace [IMAGE_URL] with the URL of the image you want to download
        //         const response = await axios.get(['https://storage.cloud.google.com/my_project_short_url_01/images/s0SDURSqr.png'], { responseType: 'blob' });
        //         const imageUrl = URL.createObjectURL(new Blob([response.data]));
        //         this.imageUrl = imageUrl;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

        // download(content) {
        //     let img = document.querySelector(content);
        //     // make <canvas> of the same size
        //     let canvas = document.createElement('canvas');
        //     canvas.width = img.clientWidth;
        //     canvas.height = img.clientHeight;

        //     let context = canvas.getContext('2d');

        //     // copy image to it (this method allows to cut image)
        //     context.drawImage(img, 0, 0);
        //     // we can context.rotate(), and do many other things on canvas

        //     // toBlob is async operation, callback is called when done
        //     canvas.toBlob(function (blob) {
        //         // blob ready, download it
        //         let link = document.createElement('a');
        //         link.download = 'example.png';

        //         link.href = URL.createObjectURL(blob);
        //         link.click();

        //         // delete the internal blob reference, to let the browser clear memory from it
        //         URL.revokeObjectURL(link.href);
        //     }, 'image/png');
        // }
    },
    computed: {
        test: function () {
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
            // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            // const dateTime = date 
            // this.timestamp = dateTime;
            if (this.$store.state.get_id_url.key == 0) {
                setTimeout(() => (
                    this.url_advace = this.$store.state.get_id_url.original_link,
                    this.key = '',
                    this.ex_date = this.$store.state.get_id_url.ex_date,
                    this.album = this.$store.state.get_id_url.name_album,
                    this.id = this.$store.state.get_id_url.id,
                    this.checkbox1 = this.$store.state.get_id_url.check_date
                ), 200)
                return this.url_advace
            } else {
                setTimeout(() => (
                    this.url_advace = this.$store.state.get_id_url.original_link,
                    this.key = this.$store.state.get_id_url.key,
                    this.ex_date = this.$store.state.get_id_url.ex_date,
                    this.album = this.$store.state.get_id_url.name_album,
                    this.id = this.$store.state.get_id_url.id,
                    this.checkbox1 = this.$store.state.get_id_url.check_date
                ), 200)
                return this.url_advace
            }
        }
    },
    mounted() {
        this.$store.dispatch('getstory', this.$store.state.token)
        this.url = this.$store.state.get_id_url
        this.url_advace = this.$store.state.get_id_url.original_link,
        this.key = this.$store.state.get_id_url.key,
        this.ex_date = this.$store.state.get_id_url.ex_date,
        this.album = this.$store.state.get_id_url.album
        this.id = this.$store.state.get_id_url.id
        this.checkbox1 = this.$store.state.get_id_url.check_date
        if (this.$vuetify.display.name == "sm" || this.$vuetify.display.name == "xs") {
            this.big = 7
            this.small = 5
            this.size_dialog_advace = '100%'
        }

    },
}
</script>