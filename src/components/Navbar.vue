<template>
  <div class="px-16 mb-6 flex items-center sticky top-0 bg-gray-900 py-5 z-50">
    <router-link :to="`/`">
      <div class="flex items-center">
        <svg
          viewBox="0 0 24 24"
          class="w-[70px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#f7f7f7"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M21.0254 8.40554C20.7987 8.20998 20.5218 8.09678 20.3141 8.02584C20.0833 7.94703 19.8184 7.88184 19.5383 7.82624C18.9764 7.71473 18.2727 7.62624 17.4908 7.55704C15.9221 7.41822 13.955 7.34998 12 7.34998C10.045 7.34997 8.0779 7.41821 6.50923 7.55704C5.7273 7.62623 5.02357 7.71473 4.46174 7.82624C4.18161 7.88184 3.91672 7.94703 3.68594 8.02583C3.4782 8.09677 3.20126 8.20998 2.97462 8.40553C2.76112 8.58976 2.63916 8.81815 2.56971 8.97159C2.49263 9.14189 2.43333 9.32752 2.38581 9.50895C2.29052 9.87283 2.21854 10.3144 2.16365 10.7872C2.05319 11.7386 2 12.9242 2 14.1032C2 15.283 2.05326 16.4858 2.16311 17.4726C2.21784 17.9643 2.28883 18.4229 2.38053 18.807C2.46043 19.1416 2.59126 19.5854 2.85131 19.906C3.08981 20.2 3.43086 20.3352 3.60561 20.3981C3.82965 20.4789 4.09015 20.5429 4.36115 20.596C4.90739 20.703 5.60964 20.7873 6.39637 20.853C7.97657 20.9851 9.99449 21.05 12 21.05C14.0055 21.05 16.0234 20.9851 17.6036 20.853C18.3904 20.7873 19.0926 20.703 19.6388 20.596C19.9098 20.5429 20.1703 20.4789 20.3944 20.3981C20.5691 20.3352 20.9102 20.2 21.1487 19.906C21.4087 19.5854 21.5396 19.1416 21.6195 18.807C21.7112 18.4229 21.7822 17.9643 21.8369 17.4726C21.9467 16.4858 22 15.283 22 14.1032C22 12.9242 21.9468 11.7386 21.8363 10.7872C21.7815 10.3144 21.7095 9.87284 21.6142 9.50896C21.5667 9.32752 21.5074 9.14189 21.4303 8.9716C21.3608 8.81815 21.2389 8.58976 21.0254 8.40554Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <line
              x1="11.4858"
              y1="6.44995"
              x2="8.39999"
              y2="3.36416"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
            <line
              x1="1"
              y1="-1"
              x2="5.36396"
              y2="-1"
              transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 11.1 6.44995)"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
          </g>
        </svg>
        <div class="flex flex-col">
          <h1 class="uppercase font-bold text-2xl ml-2">TvShowHun</h1>
          <p class="ml-2 text-xs">
            Find the latest news about your favorite tv show
          </p>
        </div>
      </div>
    </router-link>
    <div class="relative ml-auto">
      <div class="flex items-center">
        <input
          type="text"
          class="bg-gray-700 rounded-md p-1 w-[300px] h-[50px] ms-3"
          placeholder="Search Shows..."
          @input="debounceSearch"
          v-model="query"
          @keydown.enter="searchQuery"
        />
        <svg
          class="w-[20px] absolute right-4"
          fill="#ffffff"
          width="64px"
          height="64px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z"
              fill-rule="evenodd"
            ></path>
          </g>
        </svg>
      </div>
      <div
        v-if="showSearchResults"
        class="absolute w-full overflow-scroll h-[300px] scrollbar-hide"
      >
        <div class="bg-gray-700 mt-2">
          <div v-for="movie in searchResults" :key="movie.id">
            <a :href="'/detail/' + movie?.show.id" @click="clickFunction">
              <div class="flex p-1">
                <img
                  :src="movie?.show?.image?.medium"
                  class="w-[50px] rounded-md"
                  alt="show"
                />
                <div class="flex flex-col">
                  <p class="p-1">{{ movie?.show.name }}</p>
                  <div v-if="movie?.show.rating.average != null">
                    <div class="flex items-center">
                      <span class="text-yellow-500 text-xl">&#9733;</span>
                      <p>{{ movie?.show.rating.average }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="h-px my-1 bg-gray-500 border-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ApiService } from "../services/ApiService";

export default {
  data() {
    return {
      searchResults: [],
      query: "",
      showSearchResults: false,
      noResult: false,
    };
  },

  mounted() {
    this.clickEvents();
  },

  name: "Navbar",
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (event.target.value.length >= 3) {
          this.fetchSearch(event.target.value);
        }
      }, 500);
    },

    async fetchSearch(term) {
      try {
        let res = await ApiService.getSearchQuery(term);
        this.searchResults = res.data;
        this.showSearchResults = res.data ? true : false;
      } catch (error) {
        console.log(error);
      }
    },

    clickEvents() {
      window.addEventListener("click", (e) => {
        this.showSearchResults = false;
      });
    },

    searchQuery() {
      this.$router.push(`/search/${this.query}`);
      setTimeout(() => {
        this.$router.go();
      }, 100);
    },

    clickFunction() {
      this.query = "";
      setTimeout(() => {
        this.$router.go();
      }, 100);
    },
  },
};
</script>

<style></style>
