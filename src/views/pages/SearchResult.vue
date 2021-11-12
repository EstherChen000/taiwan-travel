<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="text-h4 font-weight-bold">台南市
          <span class="text-h5 font-weight-regular ml-4">共123個結果</span>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <div class="text-h6 font-weight-bold">景點類別</div>
        <v-checkbox label="旅遊"></v-checkbox>
        <v-checkbox class="mt-0" label="餐飲"></v-checkbox>
        <div class="text-h6 font-weight-bold">相關類別</div>
        <v-checkbox label="遊憩類"></v-checkbox>
        <v-checkbox class="mt-0" label="觀光工廠類"></v-checkbox>
        <v-checkbox class="mt-0" label="其他"></v-checkbox>
      </v-col>
      <v-col cols="12" sm="9">
        <v-card class="rounded-lg mb-6" outlined>
          <div class="d-flex flex-no-wrap justify-start">
            <div>
              <v-img class="rounded-tl-lg rounded-bl-lg"
              src="https://picsum.photos/200/200/?random=3"></v-img>
            </div>
            <div>
              <v-card-text class="primary--text py-2">景點</v-card-text>
              <v-card-title class="font-weight-bold pt-0 pb-8 text-h5"
                >四草野生動物保護區</v-card-title
              >
              <v-card-text class="py-0 text-body-1">
                <i class="fas fa-map-marker-alt mr-1"></i>台南市
              </v-card-text>
              <v-card-text class="py-4">遊憩類</v-card-text>
            </div>
          </div>
        </v-card>
        <v-card class="rounded-lg mb-6" outlined>
          <div class="d-flex flex-no-wrap justify-star">
            <div>
              <v-img class="rounded-tl-lg rounded-bl-lg"
              src="https://picsum.photos/200/200/?random=1"></v-img>
            </div>
            <div>
              <v-card-text class="primary--text py-2">景點</v-card-text>
              <v-card-title class="font-weight-bold pt-0 pb-8 text-h5"
                >四草野生動物保護區</v-card-title
              >
              <v-card-text class="py-0 text-body-1">
                <i class="fas fa-map-marker-alt mr-1"></i>台南市
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
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';

export default {
  name: 'SearchResult',
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
