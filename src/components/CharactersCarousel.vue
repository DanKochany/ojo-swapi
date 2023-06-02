<template>
  <Carousel
    ref="charactersCarousel"
    :settings="settings"
    :breakpoints="breakpoints"
    @slide-end="loopCarousel($event)"
  >
    <Slide v-for="character in characters" :key="character">
      <div class="movies-carousel">
        <CardComponent
          :title="character.name"
          :height="character.height"
          :birthDate="formatDate(character.birth_year)"
          :movie="false"
        >
        </CardComponent>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import SwapiController from '../controller/SwapiController';
import { ref } from 'vue';
import { formatDate } from '../mixins/mixins';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import CardComponent from './CardComponent.vue';
import 'vue3-carousel/dist/carousel.css';

const swapiController = new SwapiController();
let initialSlide = ref(2);
const charactersCarousel = ref(null);
const breakpoints = ref({
  300: {
    itemsToShow: 1,
    wrapAround: true,
  },
  600: {
    itemsToShow: 2,
    wrapAround: true,
  },
});

const settings = ref({
  itemsToShow: 3,
  wrapAround: true,
  itemsToScroll: 1,
  snapAlign: 'center',
  modelValue: initialSlide,
});

const totalCharacters = ref(0);
const verify = ref(3);
let characters: Array = ref([]);
let page = 1;
let loop = ref(true);

getCharacters();

function getCharacters() {
  if (characters.value.length == 0) {
    swapiController.getCharacters(page).then((data) => {
      characters.value = data.data.results;
      totalCharacters.value = data.data.count;
      initialSlide.value = 0;
      page++;
    });
  } else {
    swapiController.getCharacters(page).then((data) => {
      characters.value = [...characters.value, ...data.data.results];
      page++;
      loop.value = false;
    });
  }
}

function loopCarousel(event: any) {
  if (
    event.currentSlideIndex >= verify.value &&
    characters.value.length < totalCharacters.value
  ) {
    getCharacters();
    verify.value = verify.value + 2;
  }
}
</script>

<style>
section.carousel{

@media only screen and (max-width: 600px) {
  width: 90vw;   
  margin-bottom: 40px;
}
}
</style>
