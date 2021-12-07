<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="text-h4 font-weight-bold">{{keyWord || city}}
          <span class="text-h5 font-weight-regular ml-4">共{{data.length}}個結果</span>
        </div>
      </v-col>
      <!-- view point < 600px 時不顯示 -->
      <v-col cols="12" sm="3" class="d-none d-sm-flex flex-column">
        <div class="text-h6 font-weight-bold">景點類別</div>
        <v-checkbox label="旅遊"></v-checkbox>
        <v-checkbox class="mt-0" label="餐飲"></v-checkbox>
        <div class="text-h6 font-weight-bold">相關類別</div>
        <v-checkbox label="遊憩類"></v-checkbox>
        <v-checkbox class="mt-0" label="觀光工廠類"></v-checkbox>
        <v-checkbox class="mt-0" label="其他"></v-checkbox>
      </v-col>
      <!-- view point < 600px 顯示 -->
      <v-row class="d-flex d-sm-none">
        <v-dialog persistent v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-col cols="12">
              <v-chip
                class="ma-2"
                color="black"
                outlined
                v-bind="attrs"
                v-on="on"
              >景點類別<v-icon right>fas fa-angle-down</v-icon>
              </v-chip>
              <v-chip
                class="ma-2"
                color="black"
                outlined
                v-bind="attrs"
                v-on="on"
              >相關類別<v-icon right>fas fa-angle-down</v-icon>
              </v-chip>
            </v-col>
          </template>
          <v-col cols="12">
            <v-sheet class="pa-4 vh-80">
              <v-row align="center">
                <v-col class="d-flex align-start" cols="12"
                  ><v-btn color="grey darken-1" icon @click="dialog = false"
                    ><v-icon>fas fa-times</v-icon>
                  </v-btn></v-col
                >
                <v-col cols="12">
                  <div class="text-h6 font-weight-bold">景點類別</div>
                  <v-checkbox label="旅遊"></v-checkbox>
                  <v-checkbox class="mt-0" label="餐飲"></v-checkbox>
                  <div class="text-h6 font-weight-bold">相關類別</div>
                  <v-checkbox label="遊憩類"></v-checkbox>
                  <v-checkbox class="mt-0" label="觀光工廠類"></v-checkbox>
                  <v-checkbox class="mt-0" label="其他"></v-checkbox>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-dialog>
      </v-row>
      <v-col cols="12" sm="9" v-for="item in data" :key="item.ID">
        <v-card @click="getScenicSpots(item.ID)" class="rounded-lg mb-6" outlined>
          <div class="d-flex flex-no-wrap justify-start">
            <div>
              <v-img class="rounded-tl-lg rounded-bl-lg"
              :src="item.Picture.PictureUrl1" height="200px"></v-img>
            </div>
            <div>
              <v-card-text class="primary--text py-2">景點</v-card-text>
              <v-card-title class="font-weight-bold pt-0 pb-8 text-h5"
                >{{ item.Name }}</v-card-title
              >
              <v-card-text class="py-0 text-body-1">
                <i class="fas fa-map-marker-alt mr-1"></i>{{ item.Address }}
              </v-card-text>
              <v-card-text class="py-4">遊憩類</v-card-text>
            </div>
          </div>
        </v-card>
        <v-pagination class="w-100 mb-16" length="6"></v-pagination>
      </v-col>
    </v-row>
    <Footer></Footer>
  </v-container>
</template>

<script>
import JsSHA from 'jssha';
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';

export default {
  name: 'SearchResult',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    dialog: false,
    url: '',
    city: '',
    className: '',
    keyWord: '',
    data: [],
  }),
  methods: {
    getResult() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${vm.className}${vm.city}?$filter=Name%20eq%20'${vm.keyWord}'&$format=JSON`;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
        console.log(response);
        vm.data = response.data;
      });
    },
    getScenicSpots(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${id}'&$top=30&$format=JSON`;
      const vm = this;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
        console.log(response);
        console.log(id);
        // vm.scenic = response.data;
        vm.$router.push(`/scenePage/${id}`).catch(() => {});
      });
    },
    getAuthorizationHeader() {
      const appID = '4f650471c3a946078042df58395fa922';
      const appKey = 'rMjx-NyfKoXX93I7ZTe59VjoEPM';
      const GMTString = new Date().toGMTString();
      const ShaObj = new JsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(appKey, 'TEXT');
      ShaObj.update(`x-date: ${GMTString}`);
      const HMAC = ShaObj.getHMAC('B64');
      const authorization = 'hmac username="' + appID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
      return { Authorization: authorization, 'x-date': GMTString };
    },
  },
  created() {
    // this.getParameter(this.$route.params.result);
    this.city = this.$route.query.city;
    this.className = this.$route.query.class;
    this.keyWord = this.$route.query.key;
    this.getResult();
  },
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
.vh-80 {
  height: 80vh;
}
</style>
