<template>
  <v-container>
    <loading :active.sync="isLoading"></loading>
    <Navbar></Navbar>
    <div class="position-relative">
      <v-carousel hide-delimiters :show-arrows="false" height="360px" class="rounded-lg">
        <v-carousel-item src="https://picsum.photos/1280/400/?random=1" tile>
          <v-row class="fill-height">
            <div class="carousel-title-position w-100">
              <div class="text-center text-h3 white--text font-weight-bold">來去南台灣走走</div>
            </div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <!-- view point < 600px 時不顯示 -->
      <div class="searchbar-position w-100 d-none d-sm-flex">
        <v-row align="center" justify="center" class="w-100 ma-0">
          <v-col cols="12" sm="10">
            <v-sheet elevation="12" rounded="xl" class="pa-8">
              <v-radio-group v-model="className" row>
                <v-radio label="不分類別" value="不分類別"></v-radio>
                <v-radio label="旅遊景點" value="旅遊景點"></v-radio>
                <v-radio label="餐廳美食" value="餐廳美食"></v-radio>
              </v-radio-group>
              <v-row align="start">
                <v-col class="d-flex position-relative" cols="12" md="6" sm="9">
                  <v-text-field
                    label="輸入關鍵字(必填)"
                    placeholder="輸入關鍵字(必填)"
                    hide-details="auto"
                    outlined
                    v-model="keyWord"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                  <div class="tips-position">
                    <div class="d-flex flex-column">
                      <v-card height="300" class="overflow-auto">
                        <v-list>
                          <v-list-item-group v-for="(item, i) in keyWordFilter" :key="i"
                          color="primary">
                            <v-hover>
                              <v-list-item @click="goTo(item)">
                                {{item}}
                              </v-list-item>
                            </v-hover>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                    </div>
                  </div>
                </v-col>
                <v-col class="d-flex" cols="12" md="3" sm="3">
                  <v-select label="不分縣市" outlined :items="city" v-model="selectedCity"></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="3" sm="12">
                  <v-btn @click="searchSpot" class="mr-4 w-100 black--text text-h6"
                  depressed color="primary" x-large>
                    搜尋
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <!-- view point < 600px 顯示 -->
      <v-row class="d-flex d-sm-none">
        <v-dialog persistent v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <div class="searchbar-position w-100">
              <v-row align="center" justify="center" class="w-100 ma-0">
                <v-col cols="8">
                  <v-text-field
                    label="輸入關鍵字(必填)"
                    placeholder="輸入關鍵字(必填)"
                    hide-details="auto"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    class="white"
                    v-model="keyWord"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </template>
          <v-col cols="12">
            <v-sheet class="pa-4 vh-80">
              <v-row align="center">
                <v-col class="d-flex align-start" cols="12"
                  ><v-btn color="grey darken-1" icon @click="dialog = false"
                    ><v-icon>fas fa-times</v-icon>
                  </v-btn></v-col
                >
                <v-col class="d-flex" cols="12">
                  <v-text-field
                    label="輸入關鍵字(必填)"
                    placeholder="輸入關鍵字(必填)"
                    hide-details="auto"
                    outlined
                    v-model="keyWord"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <div class="tips-position">
                    <div class="d-flex flex-column">
                      <v-card height="300" class="overflow-auto">
                        <v-list>
                          <v-list-item-group v-for="(item, i) in keyWordFilter" :key="i"
                          color="primary">
                            <v-hover>
                              <v-list-item @click="goTo(item)">
                                {{item}}
                              </v-list-item>
                            </v-hover>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                    </div>
                  </div>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-select label="不分縣市" outlined :items="city" v-model="selectedCity"></v-select>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-radio-group v-model="className" row class="mt-0">
                    <v-radio label="不分類別" value="不分類別"></v-radio>
                    <v-radio label="旅遊景點" value="旅遊景點"></v-radio>
                    <v-radio label="餐廳美食" value="餐廳美食"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-btn class="mr-4 w-100 black--text text-h6"
                  @click="searchSpot" depressed color="primary" x-large>
                    搜尋
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-dialog>
      </v-row>
    </div>
    <v-row align="center" justify="center" class="mt-16">
      <v-col cols="12" sm="12" class="pb-0">
        <p class="text-h4 font-weight-bold mb-3">去哪玩?</p>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg" @click="searchCity('Tainan')"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=1"
            ><v-card-title class="text-h5 font-weight-bold">台南</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg" @click="searchCity('PingtungCounty')"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=2"
            ><v-card-title class="text-h5 font-weight-bold">屏東</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg" @click="searchCity('Chiayi')"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=3"
            ><v-card-title class="text-h5 font-weight-bold">嘉義</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg" @click="searchCity('Kaohsiung')"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=4"
            ><v-card-title class="text-h5 font-weight-bold">高雄</v-card-title></v-img
          ></v-card
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-16 mb-13">
      <v-col cols="12" sm="12" class="pb-0">
        <p class="text-h4 font-weight-bold mb-3">推薦景點</p>
      </v-col>
      <v-col v-for="item in scenic" :key="item.ID" cols="12" sm="4">
        <v-card @click="getScenicSpots(item.ScenicSpotID)" class="rounded-lg" outlined>
          <v-img :src="item.Picture.PictureUrl1 || item.Picture.PictureUrl2 ||
            item.Picture.PictureUrl3 || availableImg"
          height="250px"></v-img>
          <v-card-text class="primary--text py-2">景點</v-card-text>
          <v-card-title class="font-weight-bold pt-0 pb-8 text-h5 text-truncate">
            {{ item.ScenicSpotName }}
          </v-card-title>
          <v-card-text class="py-0 text-body-1 text-truncate">
            <i class="fas fa-map-marker-alt mr-1"></i>{{ item.Address }}
          </v-card-text>
          <v-card-text class="py-4">{{ item.Class1 || item.Class2 || '其他' }}</v-card-text>
        </v-card>
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
  name: 'Home',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    dialog: false,
    scenic: [],
    selectedCity: '',
    keyWord: '',
    className: '不分類別',
    availableImg: 'https://picsum.photos/200/200/?random=4',
    rules: {
      required: (value) => !!value || '此欄不得為空',
    },
    city: ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '連江縣'],
    list: [],
    isLoading: false,
  }),
  methods: {
    getScenicSpot() {
      const vm = this;
      const max = 5000;
      const min = 1;
      const rand = Math.floor(Math.random() * (max - min + 1));
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=3&$skip=${rand}&$format=JSON`;
      vm.isLoading = true;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
        const isImg = response.data.every((e) => (
          !e.Picture.PictureUrl1 && !e.Picture.PictureUrl2 && !e.Picture.PictureUrl3
        ));
        if (isImg) {
          vm.getScenicSpot();
        } else {
          vm.scenic = response.data;
          vm.isLoading = false;
        }
      });
    },
    getScenicSpots(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ScenicSpotID%20eq%20'${id}'&$top=30&$format=JSON`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
        vm.isLoading = false;
        vm.$router.push(`/scenePage/${id}`).catch(() => {});
      });
    },
    searchSpot() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${vm.classNameTranslate}${vm.cityTranslate}?$filter=${vm.nameTranslate}%20eq%20'${vm.keyWord}'&$format=JSON`;
      vm.isLoading = true;
      if (vm.keyWord !== '' && vm.className !== '不分類別') {
        vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then((response) => {
          if (response.data.length === 0) {
            vm.isLoading = false;
            vm.$router.push(`/NotFound/${vm.keyWord}&${vm.selectedCity}`).catch(() => {});
          } else {
            vm.isLoading = false;
            vm.$router.push(`/SearchResult/result?class=${vm.classNameTranslate}&city=${vm.cityTranslate}&key=${vm.keyWord}`).catch(() => {});
          }
        }).catch(() => {});
      } else if (vm.keyWord !== '' && vm.className === '不分類別') {
        vm.$http.all([vm.getScenic(), vm.getRestaurant()])
          .then(vm.$http.spread((acct, perms) => {
            if (acct.data.length > 0 || perms.data.length > 0) {
              vm.isLoading = false;
              vm.$router.push(`/SearchResult/result?class=${vm.classNameTranslate}&city=${vm.cityTranslate}&key=${vm.keyWord}`);
            } else {
              vm.isLoading = false;
              vm.$router.push(`/NotFound/${vm.keyWord}&${vm.selectedCity}`).catch(() => {});
            }
          }))
          .catch(() => {});
      }
    },
    searchCity(name) {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${name}?$format=JSON`;
      vm.isLoading = true;
      vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
        vm.isLoading = false;
        vm.$router.push(`/SearchResult/result?city=${name}`);
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
    getScenic() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${vm.cityTranslate}?$filter=ScenicSpotName%20eq%20'${vm.keyWord}'&$format=JSON`;
      return vm.$http.get(api, { headers: vm.getAuthorizationHeader() });
    },
    getRestaurant() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant${vm.cityTranslate}?$filter=RestaurantName%20eq%20'${vm.keyWord}'&$format=JSON`;
      return vm.$http.get(api, { headers: vm.getAuthorizationHeader() });
    },
    getAll() {
      const vm = this;
      const api1 = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=ScenicSpotName%2CScenicSpotID&$format=JSON';
      const api2 = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$select=RestaurantName%2CRestaurantID&$format=JSON';
      const fnScenic = function fnScenic() {
        return vm.$http.get(api1, { headers: vm.getAuthorizationHeader() });
      };
      const fnRestaurant = function fnRestaurant() {
        return vm.$http.get(api2, { headers: vm.getAuthorizationHeader() });
      };
      vm.isLoading = true;
      vm.$http.all([fnScenic(), fnRestaurant()])
        .then(vm.$http.spread((acct, perms) => {
          vm.list = acct.data.concat(perms.data);
          vm.isLoading = false;
        })).catch(() => {});
    },
    goTo(item) {
      const vm = this;
      vm.list.forEach((e, i, a) => {
        if (e.ScenicSpotName === item) {
          const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ScenicSpotID%20eq%20'${a[i].ScenicSpotID}'&$format=JSON`;
          vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
            vm.$router.push(`/scenePage/${a[i].ScenicSpotID}`).catch(() => {});
          });
        } else if (e.RestaurantName === item) {
          const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=RestaurantID%20eq%20'${a[i].RestaurantID}'&$format=JSON`;
          vm.$http.get(api, { headers: vm.getAuthorizationHeader() }).then(() => {
            vm.$router.push(`/scenePage/${a[i].RestaurantID}`).catch(() => {});
          });
        }
      });
    },
  },
  computed: {
    cityTranslate() {
      const vm = this;
      const city = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '金門縣', '澎湖縣', '連江縣'];
      const cityEn = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung', 'Keelung', 'Hsinchu', 'HsinchuCounty', 'MiaoliCounty', 'ChanghuaCounty', 'NantouCounty', 'YunlinCounty', 'ChiayiCounty', 'Chiayi', 'PingtungCounty', 'YilanCounty', 'HualienCounty', 'TaitungCounty', 'KinmenCounty', 'PenghuCounty', 'LienchiangCounty'];
      const a = city.indexOf(vm.selectedCity);
      if (vm.selectedCity === '') {
        return '/';
      }
      return '/' + cityEn[a];
    },
    classNameTranslate() {
      const vm = this;
      let result;
      if (vm.className === '不分類別') {
        result = '';
      } else if (vm.className === '旅遊景點') {
        result = 'ScenicSpot';
      } else if (vm.className === '餐廳美食') {
        result = 'Restaurant';
      }
      return result;
    },
    nameTranslate() {
      const vm = this;
      let result;
      if (vm.classNameTranslate === '') {
        result = '';
      } else if (vm.classNameTranslate === 'ScenicSpot') {
        result = 'ScenicSpotName';
      } else if (vm.classNameTranslate === 'Restaurant') {
        result = 'RestaurantName';
      }
      return result;
    },
    keyWordFilter() {
      const vm = this;
      const result = [];
      if (vm.list && vm.keyWord.length > 0) {
        vm.list.forEach((e) => {
          if (e.ScenicSpotName) {
            if (e.ScenicSpotName.includes(vm.keyWord)) {
              result.push(e.ScenicSpotName);
            }
          } else if (e.RestaurantName) {
            if (e.RestaurantName.includes(vm.keyWord)) {
              result.push(e.RestaurantName);
            }
          }
        });
      }
      return result;
    },
  },
  created() {
    this.getScenicSpot();
    this.getAll();
  },
};
</script>

<style lang="scss" scoped>
.searchbar-position {
  position: relative;
  top: -100px;
}
.tips-position {
  position: absolute;
  top: 170px;
  z-index: 100;
}
@media (max-width:600px) {
  .tips-position {
    top: 220px;
  }
}
.w-100 {
  width: 100%;
}
.carousel-title-position {
  position: relative;
  top: 120px;
}
.vh-80 {
  height: 80vh;
}
</style>
