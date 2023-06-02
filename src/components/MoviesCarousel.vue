<template>
  <div v-if="isLoading">
  <p class="loading-msg">Loading Movies</p></div>
  <div v-else>
    <Carousel
      :items-to-show="3"
      :wrapAround="true"
      :itemsToScroll="1"
      :snapAlign="'center'"
      :modelValue="4"
    >
      <Slide v-for="film in films" :key="film">
        <div class="movies-carousel">
          <CardComponent
            @click="sendId(film.episode_id)"
            :title="film.title"
            :director="film.director"
            :release="formatDate(film.release_date)"
            :movie="true"
          >
            <img :src="images[film.episode_id - 1]" alt="" />
          </CardComponent>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import SwapiController from '../controller/SwapiController';
import { ref, defineEmits } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import episode_1 from '../assets/episode_1.jpg';
import episode_2 from '../assets/episode_2.jpg';
import episode_3 from '../assets/episode_3.jpg';
import episode_4 from '../assets/episode_4.jpg';
import episode_5 from '../assets/episode_5.jpg';
import episode_6 from '../assets/episode_6.jpg';

const swapiController = new SwapiController();
let images = [episode_1, episode_2, episode_3, episode_4, episode_5, episode_6];

let isLoading = ref(false);

let films = ref([]);
getMovies();

function getMovies() {
  isLoading.value = true;
  swapiController.getMovies().then((data) => {
    films.value = data;
    isLoading.value = false
    
    
  });
}

function formatDate(value: any) {
  const valueArr = String(value).split('-');
  const dateFormated = `${valueArr[2]}/${valueArr[1]}/${valueArr[0]}`;
  return dateFormated;
}

const emit = defineEmits(['film'])

function sendId(value: number){
  emit('film', value)
}
</script>

<style scoped>
.movies-carousel {
  display: flex;
  flex-direction: row;
}

img {
  width: 270px;
  height: 352px;
  position: relative;
  margin-right: 60px;
  margin-left: 50px;
  left: 5px;
  top: 10px;
  border-radius: 10px 10px 0px 0px;
}

</style>
