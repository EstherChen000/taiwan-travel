<template>
  <v-app-bar flat height="80px" color="white">
    <router-link class="text-decoration-none" to="/">
      <div class="d-flex align-center">
        <v-img
          alt="Taiwan Travel Logo"
          class="shrink mr-4"
          contain
          src="@/assets/LOGO.png"
          transition="scale-transition"
          width="40"
        />
        <h1 class="primary--text text-h5 font-weight-bold">來去走走</h1>
      </div>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {};
</script>
