<template>
  <Header />
  <Shows />
</template>

<script>
import Header from "../components/Header.vue";
import Shows from "../components/Show.vue";

export default {
  components: { Shows, Header },
  name: "Home",
};
</script>

<style></style>
