<template>
  <div class="mt-10">
    <h2 class="text-xl font-semibold ml-1 md:ml-0">Popular Shows</h2>
    <div class="flex flex-wrap justify-between">
      <div v-for="show in shows" :key="show.id" class="w-1/2 md:w-[200px] mt-7">
        <router-link :to="'/detail/' + show.id">
          <div class="overflow-hidden">
            <img
              :src="`${show.image.medium}`"
              alt="image"
              class="w-full p-1 md:p-0 md:w-[190px] hover:scale-125 transition-all duration-500"
            />
          </div>
          <div class="mt-1">
            <p class="truncate font-semibold">{{ show.name }}</p>
            <div v-if="show.rating.average !== null" class="flex items-center">
              <span class="text-yellow-500 text-xl">&#9733;</span>
              <p>{{ show.rating.average }}</p>
            </div>
            <div class="hidden md:flex">
              <div v-for="genre in show.genres" :key="genre.id">
                <p class="text-xs truncate">{{ genre + "," }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <div v-if="loading" class="h-[50vh] flex items-center justify-center">
    <Loading />
  </div>

  <div v-if="error">
    <p>Something Wrong Happen, Please try again later!</p>
  </div>
</template>

<script>
import { ApiService } from "../services/ApiService";
import Loading from "./Loading.vue";

export default {
  name: "Shows",
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
      let res = await ApiService.getAllShows();
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
