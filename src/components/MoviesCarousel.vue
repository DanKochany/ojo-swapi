<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="film in films" :key="film">
        <div class="movies-carousel">
          <CardComponent
            @click="sendId(film.episode_id)"
            :title="film.title"
            :director="film.director"
            :release="formatDate(film.release_date)"
            :movie="true"
          >
            <!-- <img :src="images[film.episode_id - 1]" alt="" /> -->
            <img :src="imageUrl(film.episode_id)" />
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
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import Loader from './Loader.vue';

const swapiController = new SwapiController();
let breakpoints = ref({
  300: {
    itemsToShow: 1,
    wrapAround: true,
  },
  600:{
    itemsToShow: 3,
    wrapAround: true,
  }
});

const settings = ref({
  itemsToShow: 3,
  wrapAround: true,
  itemsToScroll: 1,
  snapAlign: 'center',
  modelValue: 4,
});

const loading = ref(true);
let films = ref([]);
getMovies();

const imageUrl = (id: number) =>
  new URL(`/src/assets/episode_${id}.jpg`, import.meta.url).toString();

function getMovies() {
  swapiController.getMovies().then((data) => {
    films.value = data.data.results;
    loading.value = false;
  });
}

function formatDate(value: any) {
  const valueArr = String(value).split('-');
  const dateFormated = `${valueArr[2]}/${valueArr[1]}/${valueArr[0]}`;
  return dateFormated;
}

const emit = defineEmits(['film']);

function sendId(value: number) {
  emit('film', value);
}
</script>

<style scoped>
.movies-carousel {
  display: flex;
  flex-direction: row;
}

section.carousel{
  @media only screen and (max-width: 600px) {
    width: 90vw;   
  }
}

.movies-carousel img:hover {
  cursor: pointer;
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

  @media only screen and (max-width: 600px) {
    width: 200px;
    margin-right: 20px;
    margin-left: 15px;
    height: 305px;
  }
}
</style>
