<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row class="d-flex flex-no-wrap justify-space-between w-100 mt-6">
      <v-col cols="12" sm="6">
        <h2 class="font-weight-bold pt-0 pb-8 text-h3">四草野生動物保護區</h2>
        <p class="py-0 text-h4 grey--text">遊憩類</p>
        <p class="py-0 text-body-1">
          <i class="fas fa-phone-alt grey--text mr-3"
          ></i>06-12345<span class="primary--text ml-3">撥打電話</span></p>
        <p class="py-0 text-body-1">
          <i class="fas fa-clock grey--text mr-3"
          ></i>週一~週五8:00~17:30，週六、日需預約</p>
        <p class="py-0 text-body-1">
          <i class="fas fa-map-marker-alt mr-1 grey--text mr-3"
          ></i>臺南市709安南區四草大道上</p>
      </v-col>
      <v-col cols="12" sm="6">
        <v-img class="rounded-lg" src="https://picsum.photos/460/310/?random=3"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h4 font-weight-bold mb-6">景點介紹</h3>
        <p>
          四草的生態環境特殊，被列為台灣四大濕地之一，裡面包括鹽田、水道、運河、溝渠等，豐富的環境可供水鳥棲息與覓食。這裡的鳥類超過160種，其中有21種瀕臨絕種、稀有鳥類，如黑面琵鷺等。
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
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
