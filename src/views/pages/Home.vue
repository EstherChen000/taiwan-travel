<template>
  <v-container>
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
              <v-radio-group row>
                <v-radio label="不分類別" value="不分類別"></v-radio>
                <v-radio label="旅遊景點" value="旅遊景點"></v-radio>
                <v-radio label="餐廳美食" value="餐廳美食"></v-radio>
              </v-radio-group>
              <v-row align="start">
                <v-col class="d-flex" cols="12" md="6" sm="9">
                  <v-text-field
                    label="輸入關鍵字(必填)"
                    hide-details="auto"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" md="3" sm="3">
                  <v-select label="不分縣市" outlined></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" md="3" sm="12">
                  <v-btn class="mr-4 w-100 black--text text-h6" depressed color="primary" x-large>
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
                    hide-details="auto"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    class="white"
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
                    hide-details="auto"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-select label="不分縣市" outlined></v-select>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-radio-group row class="mt-0">
                    <v-radio label="不分類別" value="不分類別"></v-radio>
                    <v-radio label="旅遊景點" value="旅遊景點"></v-radio>
                    <v-radio label="餐廳美食" value="餐廳美食"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex" cols="12">
                  <v-btn class="mr-4 w-100 black--text text-h6" depressed color="primary" x-large>
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
        <v-card class="rounded-lg"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=1"
            ><v-card-title class="text-h5 font-weight-bold">台南</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=2"
            ><v-card-title class="text-h5 font-weight-bold">屏東</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg"
          ><v-img class="white--text align-end" src="https://picsum.photos/266/252/?random=3"
            ><v-card-title class="text-h5 font-weight-bold">嘉義</v-card-title></v-img
          ></v-card
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="rounded-lg"
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
      <v-col cols="12" sm="4">
        <v-card class="rounded-lg" outlined>
          <v-img src="https://picsum.photos/363/248/?random=1"></v-img>
          <v-card-text class="primary--text py-2">景點</v-card-text>
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
          <v-card-text class="primary--text py-2">景點</v-card-text>
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
          <v-card-text class="primary--text py-2">景點</v-card-text>
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
  name: 'Home',
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style lang="scss" scoped>
.searchbar-position {
  position: relative;
  top: -100px;
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
