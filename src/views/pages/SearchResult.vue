<template>
  <v-container style="max-width: 1136px">
    <loading :active.sync="isLoading"></loading>
    <Navbar></Navbar>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="text-h4 font-weight-bold">{{city === '/' ? keyWord : city}}
          <span class="text-h5 font-weight-regular ml-4">共{{num}}個結果</span>
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
            <v-sheet class="pa-4 h-auto">
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
        @click="getScenicSpots(item.ScenicSpotID), getRestaurants(item.RestaurantID)"
        class="rounded-lg mb-6" outlined>
          <div class="d-flex flex-no-wrap justify-start">
            <div>
              <v-img class="rounded-tl-lg rounded-bl-lg"
              :src="item.Picture.PictureUrl1 || availableImg" height="200px" width="200px"></v-img>
            </div>
            <div>
              <v-card-text class="primary--text py-2">{{ getType(item.ScenicSpotID) ||
                getType(item.RestaurantID)}}</v-card-text>
              <v-card-title class="font-weight-bold pt-0 pb-8 text-h5"
                >{{ item.ScenicSpotName || item.RestaurantName}}</v-card-title
              >
              <v-card-text class="py-0 text-body-1">
                <i class="fas fa-map-marker-alt mr-1"></i>{{ item.Address }}
              </v-card-text>
              <v-card-text class="py-4">{{ getClass(item) }}</v-card-text>
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
    num: 0,
    availableImg: 'https://picsum.photos/200/200/?random=4',
    isLoading: false,
  }),
  methods: {
    getResult() {
      const vm = this;
      vm.isLoading = true;
      if (vm.className === '' && vm.keyWord !== undefined) {
        const api1 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${vm.city}?$filter=Name%20eq%20'${vm.keyWord}'&$format=JSON`;
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
            vm.pages = Math.ceil(vm.data.length / vm.count);
            vm.isLoading = false;
          })).catch(() => {});
        vm.selected = ['旅遊', '餐飲'];
      } else if (vm.className !== '' && vm.className !== undefined) {
        const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${vm.className}${vm.city}?$filter=Name%20eq%20'${vm.keyWord}'&$format=JSON`;
        vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
          vm.data = response.data;
          vm.findClass();
          vm.pages = Math.ceil(vm.data.length / vm.count);
          vm.isLoading = false;
          if (vm.className === 'ScenicSpot') {
            vm.selected = ['旅遊'];
          } else {
            vm.selected = ['餐飲'];
          }
        });
      } else if (vm.keyWord === undefined && vm.className === undefined) {
        const api1 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${vm.city}?$format=JSON`;
        const api2 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${vm.city}?$format=JSON`;
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
            vm.pages = Math.ceil(vm.data.length / vm.count);
            vm.isLoading = false;
          })).catch(() => {});
        vm.selected = ['旅遊', '餐飲'];
      }
    },
    getScenicSpots(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ScenicSpotID%20eq%20'${id}'&$format=JSON`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
        vm.isLoading = false;
        vm.$router.push(`/scenePage/${id}`).catch(() => {});
      });
    },
    getRestaurants(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=ScenicSpotID%20eq%20'${id}'&$format=JSON`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
        vm.isLoading = false;
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
      if (className.length > 0) {
        vm.aboutSelecte = className.filter((h, i) => (
          className.indexOf(h) === i
        ));
        vm.aboutSelected = vm.aboutSelecte;
      } else {
        vm.aboutSelecte = ['其他'];
        vm.aboutSelected = vm.aboutSelecte;
      }
    },
    getType(id) {
      let result;
      if (id.indexOf('C1') !== -1 || id.indexOf('C2') !== -1) {
        result = '景點';
      } else {
        result = '餐飲';
      }
      return result;
    },
    getClass(item) {
      let result = '';
      const keyNameArr = Object.keys(item);
      const fitKeyNameArr = keyNameArr.filter((g) => (
        g.includes('Class')
      ));
      if (fitKeyNameArr.length === 0) {
        result = '其他';
      } else {
        fitKeyNameArr.forEach((h) => {
          result += `${item[h]} `;
        });
      }
      return result;
    },
  },
  computed: {
    viewData() {
      const vm = this;
      let arr = [];
      vm.data.forEach((e) => {
        const keyNameArr = Object.keys(e);
        const fitKeyNameArr = keyNameArr.filter((g) => (
          g.includes('Class')
        ));
        if (fitKeyNameArr.length > 0) {
          if (vm.selectedTranslate.length > 0) {
            vm.selectedTranslate.forEach((s) => {
              vm.aboutSelected.forEach((f) => {
                fitKeyNameArr.forEach((h) => {
                  if (e.ScenicSpotID && e.ScenicSpotID.includes(s) && e[h] === f) {
                    arr.push(e);
                  } else if (e.RestaurantID && e.RestaurantID.includes(s) && e[h] === f) {
                    arr.push(e);
                  }
                });
              });
            });
          }
        } else if (vm.aboutSelecte.length > 0 && fitKeyNameArr.length === 0
          && vm.otherChecker === true) {
          arr.push(e);
        }
      });
      arr = arr.filter((i, j) => (
        arr.indexOf(i) === j
      ));
      vm.num = arr.length;
      vm.pages = Math.ceil(arr.length / vm.count);
      arr = arr.filter((element, index) => (
        index >= vm.count * (vm.page - 1) && index < vm.count * vm.page
      ));
      return arr;
    },
    selectedTranslate() {
      const vm = this;
      const arr = [];
      vm.selected.forEach((e) => {
        if (e === '旅遊') {
          arr.push('C1_');
        } else if (e === '餐飲') {
          arr.push('C3_');
        }
      });
      return arr;
    },
    otherChecker() {
      const vm = this;
      if (vm.aboutSelected.includes('其他')) {
        return true;
      }
      return false;
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
.h-auto {
  height: auto;
}
</style>
