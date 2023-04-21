<template>
  <p class="text-center text-lg md:text-start">
    showing result for "{{ this.$route.params.query }}"
  </p>
  <div v-if="error">
    <p>Something Wrong Happen, Please try again later!</p>
  </div>
  <div v-else-if="loading" class="h-[50vh] flex items-center justify-center">
    <Loading />
  </div>
  <div v-else class="flex flex-wrap justify-evenly">
    <div v-for="show in shows" :key="show.id" class="w-1/2 md:w-[200px]">
      <router-link :to="'/detail/' + show?.show.id">
        <div class="p-1 mt-5">
          <div class="overflow-hidden">
            <div v-if="show?.show.image !== null">
              <img
                :src="`${show?.show?.image?.medium}`"
                alt="image"
                class="hover:scale-125 transition-all duration-500"
              />
            </div>
            <div v-else>
              <img
                src="https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image.jpg?ver=6"
                alt="image"
                class="h-[265px]"
              />
            </div>
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
            <div class="hidden md:flex">
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
