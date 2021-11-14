<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row class="d-flex flex-no-wrap justify-space-between w-100 mt-6">
      <v-col cols="12" sm="6">
        <h2 class="font-weight-bold pt-0 pb-8 text-h3">{{scenic[0].Name}}</h2>
        <p class="py-0 text-h4 grey--text">遊憩類</p>
        <!-- vp > 600px 顯示 呈現文左圖右 -->
        <div class="d-none d-sm-flex flex-column">
          <p class="py-0 text-body-1">
            <i class="fas fa-phone-alt grey--text mr-3"
            ></i>{{scenic[0].Phone}}<span class="primary--text ml-3">撥打電話</span></p>
          <p class="py-0 text-body-1">
            <i class="fas fa-clock grey--text mr-3"
            ></i>{{scenic[0].OpenTime}}</p>
          <p class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1 grey--text mr-3"
            ></i>{{scenic[0].Address}}</p>
        </div>
      </v-col>
      <!-- vp > 600px 不顯示, 當<600px時 呈現標題-圖-資訊 -->
      <v-col cols="12" sm="6" class="d-flex d-sm-none">
        <v-img class="rounded-lg" height="300px" :src="scenic[0].Picture.PictureUrl1"></v-img>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex d-sm-none flex-column">
        <p class="py-0 text-body-1">
          <i class="fas fa-phone-alt grey--text mr-3"
          ></i>{{scenic[0].Phone}}<span class="primary--text ml-3">撥打電話</span></p>
        <p class="py-0 text-body-1">
          <i class="fas fa-clock grey--text mr-3"
          ></i>{{scenic[0].OpenTime}}</p>
        <p class="py-0 text-body-1">
          <i class="fas fa-map-marker-alt mr-1 grey--text mr-3"
          ></i>{{scenic[0].Address}}</p>
      </v-col>
      <!-- vp > 600px 顯示 呈現文左圖右 -->
      <v-col cols="12" sm="6" class="d-none d-sm-flex">
        <v-img class="rounded-lg" height="300px" :src="scenic[0].Picture.PictureUrl1"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h4 font-weight-bold mb-6">景點介紹</h3>
        <p>
          {{scenic[0].DescriptionDetail}}
        </p>
      </v-col>
    </v-row>
    <v-row class="mt-16 mb-13">
      <v-col cols="12" sm="12">
        <h3 class="text-h4 font-weight-bold">
          附近餐飲
        </h3>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="rounded-lg" outlined>
          <v-img src="https://picsum.photos/363/248/?random=1"></v-img>
          <v-card-text class="primary--text py-2">餐飲</v-card-text>
          <v-card-title class="font-weight-bold pt-0 pb-8 text-h5">四草野生動物保護區</v-card-title>
          <v-card-text class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1"></i>台南市
          </v-card-text>
          <v-card-text class="py-4">遊憩類</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="rounded-lg" outlined>
          <v-img src="https://picsum.photos/363/248/?random=2"></v-img>
          <v-card-text class="primary--text py-2">餐飲</v-card-text>
          <v-card-title class="font-weight-bold pt-0 pb-8 text-h5">四草野生動物保護區</v-card-title>
          <v-card-text class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1"></i>台南市
          </v-card-text>
          <v-card-text class="py-4">遊憩類</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="rounded-lg" outlined>
          <v-img src="https://picsum.photos/363/248/?random=3"></v-img>
          <v-card-text class="primary--text py-2">餐飲</v-card-text>
          <v-card-title class="font-weight-bold pt-0 pb-8 text-h5">四草野生動物保護區</v-card-title>
          <v-card-text class="py-0 text-body-1">
            <i class="fas fa-map-marker-alt mr-1"></i>台南市
          </v-card-text>
          <v-card-text class="py-4">遊憩類</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Footer></Footer>
  </v-container>
</template>

<script>
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
  }),
  methods: {
    getScenicSpot() {
      const vm = this;
      const api = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${vm.id}'&$top=30&$format=JSON`;
      vm.$http.get(api).then((response) => {
        vm.scenic = response.data;
      });
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
