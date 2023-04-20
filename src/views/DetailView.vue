<template>
  <div v-if="error">
    <p>Something Wrong Happen, Please try again later!</p>
  </div>
  <div v-else-if="loading" class="h-[50vh] flex items-center justify-center">
    <Loading />
  </div>
  <div v-else>
    <div class="grid grid-cols-5 gap-4 mt-[50px]">
      <div class="sticky top-0 h-[500px]">
        <img :src="`${show?.image?.medium}`" alt="image" class="w-full" />
        <div v-if="show.rating.average !== null" class="flex items-center mt-3">
          <span class="text-yellow-500 text-6xl">&#9733;</span>
          <p class="text-5xl">{{ show.rating.average }}</p>
        </div>
      </div>
      <div class="col-span-3">
        <h1 class="text-3xl font-bold">{{ show?.name }}</h1>
        <div class="flex">
          <p>
            Series
            {{ "(" + getYear(show.premiered) }}
          </p>
          <p>-</p>
          <div v-if="show.ended == null">Now{{ ")" }}</div>
          <div v-else>
            <p>
              {{ getYear(show.ended) + ")" }}
            </p>
          </div>
        </div>
        <p class="mt-4" v-html="show.summary"></p>
        <h1 class="font-bold text-2xl mt-6">Details</h1>

        <div class="flex mt-2">
          <p class="font-semibold">Genres</p>
          <div v-for="genre in show.genres" :key="genre.id">
            <p class="bg-gray-700 rounded-lg ml-2 px-1">{{ genre }}</p>
          </div>
        </div>
        <hr class="h-px my-2 bg-gray-700 border-0" />

        <div class="flex mt-2">
          <p class="font-semibold">Runtime</p>
          <p class="ml-2">{{ show.runtime }} min</p>
        </div>
        <hr class="h-px my-2 bg-gray-700 border-0" />

        <div class="flex mt-2">
          <p class="font-semibold">Language</p>
          <p class="ml-2">{{ show.language }}</p>
        </div>
        <hr class="h-px my-2 bg-gray-700 border-0" />

        <h1 class="font-bold text-2xl mt-6">Episodes</h1>
        <div v-for="episode in episodes" :key="episode.id">
          <div class="flex items-center mt-2">
            <div v-if="episode?.image !== null">
              <img
                :src="episode?.image?.medium"
                alt="episode"
                class="w-[150px]"
              />
            </div>
            <div v-else>
              <img
                src="https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image.jpg?ver=6"
                alt="episode"
                class="w-[150px]"
              />
            </div>
            <div class="flex flex-col ml-2">
              <p>Season {{ episode.season }} Episode {{ episode.number }}</p>
              <p class="font-semibold text-lg">{{ episode.name }}</p>
              <div
                v-if="episode.rating.average !== null"
                class="flex items-center"
              >
                <span class="text-yellow-500 text-xl">&#9733;</span>
                <p>{{ episode.rating.average }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky top-0 h-[600px] overflow-scroll scrollbar-hide">
        <h1 class="text-xl font-bold">Cast</h1>
        <div v-for="cast in casts" :key="cast.id">
          <div class="flex items-center my-3">
            <div v-if="cast.person.image !== null">
              <img
                :src="cast?.person?.image?.medium"
                class="rounded-full w-[70px]"
                alt="person"
              />
            </div>
            <div v-else>
              <img
                src="https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720"
                class="rounded-full w-[70px]"
                alt="person"
              />
            </div>
            <p class="ms-1">{{ cast.person.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ApiService } from "../services/ApiService";
import { ref } from "vue";
import Loading from "../components/Loading.vue";

export default {
  name: "DetailView",
  components: { Loading },
  data() {
    return {
      loading: false,
      show: {},
      casts: [],
      episodes: [],
      error: null,
    };
  },

  created: async function () {
    try {
      this.loading = true;
      let res = await ApiService.getDetailShows(this.$route.params.id);
      let resCast = await ApiService.getShowCast(this.$route.params.id);
      let resEpisodes = await ApiService.getShowEpisode(this.$route.params.id);
      this.show = res.data;
      this.casts = resCast.data;
      this.episodes = resEpisodes.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.error = error;
      this.loading = false;
    }
  },

  setup() {
    const date = ref();
    function getYear(dateString) {
      const date = new Date(dateString).getFullYear();
      return date;
    }
    return { date, getYear };
  },
};
</script>
