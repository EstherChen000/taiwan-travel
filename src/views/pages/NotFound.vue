<template>
  <v-container style="max-width: 1136px">
    <Navbar></Navbar>
    <v-row class="mt-4 vh-80">
      <v-col cols="12" sm="12">
        <div class="text-h4 font-weight-bold mb-8">“dfdfadfdsfdf”,台南市
          <span class="text-h5 font-weight-regular ml-4">共 0 個結果</span>
        </div>
        <div class="mb-4">找不到符合條件的結果</div>
        <div class="mb-2">
          建議：
        </div>
        <ul>
          <li>請檢查有無錯別字。</li>
          <li>試試以其他關鍵字搜尋。</li>
          <li>接受它。</li>
        </ul>
      </v-col>
    </v-row>
    <Footer></Footer>
  </v-container>
</template>

<script>
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';

export default {
  name: 'NotFound',
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
.vh-80 {
  height: 80vh;
}
</style>
