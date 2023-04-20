<template>
  <p>showing result for "{{ this.$route.params.query }}"</p>
  <div v-if="error">
    <p>Something Wrong Happen, Please try again later!</p>
  </div>
  <div v-else-if="loading" class="h-[50vh] flex items-center justify-center">
    <Loading />
  </div>
  <div v-else class="flex flex-wrap justify-evenly">
    <div v-for="show in shows" :key="show.id">
      <router-link :to="'/detail/' + show?.show.id">
        <div class="w-[190px] mt-5">
          <div class="overflow-hidden">
            <img
              :src="`${show?.show?.image?.medium}`"
              alt="image"
              class="hover:scale-125 transition-all duration-500"
            />
          </div>
          <div class="mt-1">
            <p class="truncate font-semibold">{{ show.show.name }}</p>
            <div
              v-if="show.show.rating.average !== null"
              class="flex items-center"
            >
              <span class="text-yellow-500 text-xl">&#9733;</span>
              <p>{{ show.show.rating.average }}</p>
            </div>
            <div class="flex">
              <div v-for="genre in show.show.genres" :key="genre.id">
                <p class="text-xs truncate">{{ genre + "," }}</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>

  <div v-if="shows.length == 0">
    <h1 class="font-bold text-3xl h-[50vh] flex items-center justify-center">
      No Show Found!
    </h1>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { ApiService } from "../services/ApiService";

export default {
  name: "SearchView",
  components: { Loading },
  data() {
    return {
      loading: false,
      shows: [],
      error: null,
    };
  },
  created: async function () {
    try {
      this.loading = true;
      let res = await ApiService.getSearchQuery(this.$route.params.query);
      this.shows = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.error = error;
      this.loading = false;
    }
  },
};
</script>

<style></style>
