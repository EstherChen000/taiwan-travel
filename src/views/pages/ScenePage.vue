<template>
  <v-container style="max-width: 1136px">
    <loading :active.sync="isLoading"></loading>
    <Navbar></Navbar>
    <v-row class="d-flex flex-no-wrap justify-space-between w-100 mt-6">
      <v-col cols="12"
             sm="6">
        <h2 class="font-weight-bold pt-0 pb-8 text-h3">
          {{ scenic[0].ScenicSpotName || scenic[0].RestaurantName }}
        </h2>
        <p class="py-0 text-h4 grey--text">{{ scenic[0].Class1 || "其他" }}</p>
        <!-- vp > 600px 顯示 呈現文左圖右 -->
        <div class="d-none d-sm-flex flex-column">
          <p class="py-0 text-body-1">
            <i class="fas fa-phone-alt grey--text mr-3"></i>{{ scenic[0].Phone
            }}<span class="primary--text ml-3">撥打電話</span>
          </p>
          <p class="py-0 text-body-1">
            <i class="fas fa-clock grey--text mr-3"></i>{{ scenic[0].OpenTime }}
          </p>
          <p class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1 grey--text mr-3"></i>{{ scenic[0].Address }}
          </p>
        </div>
      </v-col>
      <!-- vp > 600px 不顯示, 當<600px時 呈現標題-圖-資訊 -->
      <v-col cols="12"
             sm="6"
             class="d-flex d-sm-none">
        <v-img class="rounded-lg"
               height="300px"
               :src="scenic[0].Picture.PictureUrl1 ||
               scenic[0].Picture.PictureUrl2 || availableImg">
        </v-img>
      </v-col>
      <v-col cols="12"
             sm="6"
             class="d-flex d-sm-none flex-column">
        <p class="py-0 text-body-1">
          <i class="fas fa-phone-alt grey--text mr-3"></i>{{ scenic[0].Phone
          }}<span class="primary--text ml-3">撥打電話</span>
        </p>
        <p class="py-0 text-body-1">
          <i class="fas fa-clock grey--text mr-3"></i>{{ scenic[0].OpenTime }}
        </p>
        <p class="py-0 text-body-1">
          <i class="fas fa-map-marker-alt mr-1 grey--text mr-3"></i>{{ scenic[0].Address }}
        </p>
      </v-col>
      <!-- vp > 600px 顯示 呈現文左圖右 -->
      <v-col cols="12"
             sm="6"
             class="d-none d-sm-flex">
        <v-img class="rounded-lg"
               height="300px"
               :src="scenic[0].Picture.PictureUrl1 ||
               scenic[0].Picture.PictureUrl2 || availableImg">
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h4 font-weight-bold mb-6">景點介紹</h3>
        <p>
          {{ scenic[0].DescriptionDetail || scenic[0].Description }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h4 font-weight-bold mb-6">地圖</h3>
      </v-col>
      <v-col cols="12">
        <GmapMap :center="marker[0].position"
                 :zoom="12"
                 :options="options"
                 style="width: 100%; height: 600px">
          <GmapMarker v-for="(element, index) in marker"
                      :key="index"
                      :position="element.position"
                      :clickable="true"
                      :draggable="false"
                      @click="toggleMapInfo(element, index)" />
          <GmapInfoWindow :position="infoWindowPos"
                          :opened="infoWinOpen"
                          :options="infoOptions"
                          @closeclick="infoWinOpen = false" />
        </GmapMap>
      </v-col>
    </v-row>
    <v-row class="mt-16 mb-13">
      <v-col cols="12"
             sm="12">
        <h3 class="text-h4 font-weight-bold">附近餐飲</h3>
      </v-col>
      <v-col cols="12"
             sm="4"
             v-for="item in getRestaurantThree"
             :key="item.ID">
        <v-card @click="getRestaurants(item.RestaurantID)"
                class="rounded-lg"
                outlined
                height="400px">
          <v-img :src="item.Picture.PictureUrl1 || item.Picture.PictureUrl2 || availableImg"
                 height="250px"></v-img>
          <v-card-text class="primary--text py-2">餐飲</v-card-text>
          <v-card-title class="font-weight-bold pt-0 pb-8 text-h5">
            {{ item.RestaurantName }}
          </v-card-title>
          <v-card-text class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1"></i>{{ item.Address }}
          </v-card-text>
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
  name: 'scenePage',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    id: '',
    scenic: {},
    restaurant: [],
    selectedCity: '',
    availableImg: 'https://picsum.photos/200/200/?random=4',
    isLoading: false,
    options: {
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      disableDefaultUI: false,
      scrollwheel: true,
      clickableIcons: true,
    },
    marker: [],
    infoWindowPos: null,
    infoWinOpen: false,
    currentIndex: null,
    infoOptions: {
      maxWidth: 200,
      content: '',
      pixelOffset: {
        width: 0,
        height: -40,
      },
    },
  }),
  methods: {
    getScenicSpot() {
      const vm = this;
      const api1 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ScenicSpotID%20eq%20'${vm.id}'&$top=30&$format=JSON`;
      const api2 = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=RestaurantID%20eq%20'${vm.id}'&$top=30&$format=JSON`;
      const code1 = /C1_\w+/;
      const code2 = /C3_\w+/;
      vm.isLoading = true;
      if (vm.id.match(code1)) {
        vm.$http
          .get(api1, { headers: vm.getAuthorizationHeader() })
          .then((response) => {
            vm.scenic = response.data;
            vm.getMarker(response, 2);
            vm.selectedCity = response.data[0].City;
            vm.getRestaurant();
          });
      } else if (vm.id.match(code2)) {
        vm.$http
          .get(api2, { headers: vm.getAuthorizationHeader() })
          .then((response) => {
            vm.scenic = response.data;
            vm.getMarker(response, 2);
            vm.selectedCity = response.data[0].City;
            vm.getRestaurant();
          });
      }
    },
    getRestaurant() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant${vm.cityTranslate}?$format=JSON`;
      const regex = /[0-9]/gi;
      const addressSpot = vm.scenic[0].Address.replace(vm.selectedCity, '')
        .replace(regex, '')
        .slice(0, 3);
      vm.$http
        .get(api, { headers: vm.getAuthorizationHeader() })
        .then((response) => {
          response.data.forEach((e) => {
            if (e.Address.includes(addressSpot)) {
              vm.restaurant.push(e);
            } else {
              vm.restaurant.push(e);
            }
          });
          vm.isLoading = false;
        });
    },
    getRestaurants(id) {
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=RestaurantID%20eq%20'${id}'&$format=JSON`;
      const vm = this;
      vm.$http
        .get(api, { headers: vm.getAuthorizationHeader() })
        .then((response) => {
          vm.scenic = response.data;
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
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
      const authorization = 'hmac username="'
      + appID
      + '", algorithm="hmac-sha1", headers="x-date", signature="'
      + HMAC + '"';
      return { Authorization: authorization, 'x-date': GMTString };
    },
    getMarker(response, layer = 1) {
      const vm = this;
      if (layer === 2) {
        response.data.forEach((e) => {
          vm.marker.push({
            position: {
              lat: e.Position.PositionLat,
              lng: e.Position.PositionLon,
            },
            infoText: `"<h1>${e.ScenicSpotName}</h1>"`,
          });
        });
      } else if (layer === 0) {
        vm.marker.push({
          position: {
            lat: response.Position.PositionLat,
            lng: response.Position.PositionLon,
          },
          infoText: response.RestaurantName,
        });
      }
    },
    toggleMapInfo(marker, index) {
      const vm = this;
      vm.infoWindowPos = marker.position;
      vm.infoOptions.content = marker.infoText;
      if (vm.currentIndex === index) {
        vm.infoWinOpen = !vm.infoWinOpen;
      } else {
        vm.infoWinOpen = true;
        vm.currentIndex = index;
      }
    },
  },
  computed: {
    cityTranslate() {
      const vm = this;
      const city = [
        '臺北市',
        '新北市',
        '桃園市',
        '臺中市',
        '臺南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '新竹縣',
        '苗栗縣',
        '彰化縣',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '嘉義市',
        '屏東縣',
        '宜蘭縣',
        '花蓮縣',
        '臺東縣',
        '金門縣',
        '澎湖縣',
        '連江縣',
      ];
      const cityEn = [
        'Taipei',
        'NewTaipei',
        'Taoyuan',
        'Taichung',
        'Tainan',
        'Kaohsiung',
        'Keelung',
        'Hsinchu',
        'HsinchuCounty',
        'MiaoliCounty',
        'ChanghuaCounty',
        'NantouCounty',
        'YunlinCounty',
        'ChiayiCounty',
        'Chiayi',
        'PingtungCounty',
        'YilanCounty',
        'HualienCounty',
        'TaitungCounty',
        'KinmenCounty',
        'PenghuCounty',
        'LienchiangCounty',
      ];
      const a = city.indexOf(vm.selectedCity);
      if (vm.selectedCity === '') {
        return '/';
      } else if (vm.selectedCity === undefined) {
        const addressSpot = vm.scenic[0].Address.slice(0, 3);
        const b = city.indexOf(addressSpot);
        return '/' + cityEn[b];
      }
      return '/' + cityEn[a];
    },
    getRestaurantThree() {
      const vm = this;
      const max = vm.restaurant.length;
      const min = 1;
      const rand = Math.floor(Math.random() * (max - min + 1));
      const arr = [];
      vm.restaurant.forEach((e, index) => {
        if (index >= rand && index < rand + 3) {
          arr.push(e);
          vm.getMarker(e, 0);
        }
      });
      return arr;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getScenicSpot();
  },
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
