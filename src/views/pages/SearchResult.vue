<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="text-h4 font-weight-bold">{{city === '/' ? keyWord : city}}
          <span class="text-h5 font-weight-regular ml-4">共{{data.length}}個結果</span>
        </div>
      </v-col>
      <!-- view point < 600px 時不顯示 -->
      <v-col cols="12" sm="3" class="d-none d-sm-flex flex-column">
        <div class="text-h6 font-weight-bold">景點類別</div>
        <v-checkbox label="旅遊" value="旅遊" v-model="selected"></v-checkbox>
        <v-checkbox class="mt-0" label="餐飲" value="餐飲" v-model="selected"></v-checkbox>
        <div class="text-h6 font-weight-bold">相關類別</div>
          <div v-for="(val, key) in aboutSelecte" :key="key">
            <v-checkbox :label="val" :value="val" v-model="aboutSelected"></v-checkbox>
          </div>
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
                  <v-checkbox label="旅遊" value="旅遊" v-model="selected"></v-checkbox>
                  <v-checkbox class="mt-0" label="餐飲" value="餐飲" v-model="selected"></v-checkbox>
                  <div class="text-h6 font-weight-bold">相關類別</div>
                  <div v-for="(val, key) in aboutSelecte" :key="key">
                    <v-checkbox :label="val" :value="val" v-model="aboutSelected"></v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-dialog>
      </v-row>
      <v-col cols="12" sm="9">
        <v-card v-for="item in viewData" :key="item.ID"
        @click="getScenicSpots(item.ID)" class="rounded-lg mb-6" outlined>
          <div class="d-flex flex-no-wrap justify-start">
            <div>
              <v-img class="rounded-tl-lg rounded-bl-lg"
              :src="item.Picture.PictureUrl1 || availableImg" height="200px" width="200px"></v-img>
            </div>
            <div>
              <v-card-text class="primary--text py-2">景點</v-card-text>
              <v-card-title class="font-weight-bold pt-0 pb-8 text-h5"
                >{{ item.Name }}</v-card-title
              >
              <v-card-text class="py-0 text-body-1">
                <i class="fas fa-map-marker-alt mr-1"></i>{{ item.Address }}
              </v-card-text>
              <v-card-text class="py-4">{{ item.Class1 || item.Class2 || '其他' }}</v-card-text>
            </div>
          </div>
        </v-card>
        <v-pagination v-model="page" :length="pages" total-visible="7"
        class="w-100 mb-16"></v-pagination>
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
    selected: ['旅遊', '餐飲'],
    aboutSelecte: [],
    aboutSelected: [],
    page: 1,
    pages: 3,
    count: 30,
    availableImg: 'https://picsum.photos/200/200/?random=4',
  }),
  methods: {
    getResult() {
      const vm = this;
      if (vm.className === undefined) {
        const api1 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${vm.city}?$filter=Name%20eq%20${vm.keyWord}'&$format=JSON`;
        const api2 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant${vm.city}?$filter=Name%20eq%20'${vm.keyWord}'&$format=JSON`;
        const fnScenic = function fnScenic() {
          return vm.$http.get(api1, { headers: vm.getAuthorizationHeader() });
        };
        const fnRestaurant = function fnRestaurant() {
          return vm.$http.get(api2, { headers: vm.getAuthorizationHeader() });
        };
        vm.$http.all([fnScenic(), fnRestaurant()])
          .then(vm.$http.spread((acct, perms) => {
            vm.data = acct.data.concat(perms.data);
            vm.findClass();
          })).catch(() => {});
        vm.pages = Math.ceil(vm.data.length / vm.count);
        vm.selected = ['旅遊', '餐飲'];
      } else if (vm.className !== undefined) {
        const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${vm.className}${vm.city}?$filter=Name%20eq%20'${vm.keyWord}'&$format=JSON`;
        vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
          vm.data = response.data;
          vm.findClass();
          vm.pages = Math.ceil(vm.data.length / vm.count);
          if (vm.className === 'ScenicSpot') {
            vm.selected = ['旅遊'];
          } else {
            vm.selected = ['餐飲'];
          }
        });
      }
    },
    getScenicSpots(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${id}'&$format=JSON`;
      const vm = this;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
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
    findClass() {
      const vm = this;
      const className = [];
      vm.data.forEach((e) => {
        const keyNameArr = Object.keys(e);
        const classList = [];
        keyNameArr.forEach((f) => {
          if (f.includes('Class')) {
            classList.push(f);
          }
        });
        classList.forEach((g) => {
          className.push(e[g]);
        });
      });
      vm.aboutSelecte = className.filter((h, i) => (
        className.indexOf(h) === i
      ));
      vm.aboutSelected = vm.aboutSelecte;
    },
  },
  computed: {
    viewData() {
      const vm = this;
      const arr = [];
      vm.data.forEach((e, index) => {
        if (index >= vm.count * (vm.page - 1) && index < vm.count * vm.page) {
          arr.push(e);
        }
      });
      return arr;
    },
  },
  created() {
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
