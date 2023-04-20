<template>
  <Navbar />
  <div class="mx-2 lg:mx-16">
    <RouterView />
  </div>
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar, Footer },
  name: "App",
};
</script>

<style>
html,
body {
  font-family: "Poppins", sans-serif;
  background-color: rgb(17 24 39);
  color: white;
}
</style>
