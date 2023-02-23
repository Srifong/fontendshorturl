<template>
    <v-app style="background: #e1e8eb" v-if="this.$store.state.isAuthenticated">
        <v-btn size="small" color="bule" class="ma-2" variant="text" icon="mdi-chevron-left" to="/searchurl"></v-btn>
        <div v-if="data1.length <= 0">
            <v-card class="text-center pa-10" elevation="0" color="weservegrey">
                <v-progress-circular :size="70" :width="2" color="amber" indeterminate></v-progress-circular>
            </v-card>
        </div>
        <div v-else>
            <v-card class="rounded-lg ml-5 mr-5 mb-5">
                <v-table density="compact">
                    <thead>
                        <tr>
                            <th class="text-left" bgcolor="#FFC801">
                                รายการ
                            </th>
                            <th class="text-left" bgcolor="#FFC801">
                                ข้อมูล
                            </th>
                            <th class="text-left" bgcolor="#FFC801">
                                เวลา
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data1" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.data }} </td>
                            <td>{{ item.date }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </div>


    </v-app>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        data1: [],
        id: sessionStorage.getItem("showurlid")

    }),
    mounted() {
        const id_shorturl = this.id
        const token = this.$store.state.token
        axios
            .get("/api/story/" + id_shorturl, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                this.data1 = res.data
            })
            .catch((error) => {
                console.log(error);
            });
    },
}

// getstory(commit, token,id_shorurl) {
//       console.log(token,'??????????????',id_shorurl)
//       axios
//         .get("/api/story/", {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         })
//         .then((res) => {
//           let get_story = res.data;
//           this.commit("addgetstory", get_story);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },

</script>