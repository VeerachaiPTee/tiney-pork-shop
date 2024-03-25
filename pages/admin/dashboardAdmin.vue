<template>
  <div class="">
    <Navbar></Navbar>
    <v-container fluid> asdasd </v-container>
  </div>
</template>

<script>
import Navbar from '../../components/navbarAdmin.vue'
export default {
  components: {
    Navbar,
  },
  mounted() {
    this.$checkAuth()
  },
}
</script>

<style>
</style>