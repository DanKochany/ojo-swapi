<template>
  <template v-if="!loop">
    <Carousel
      ref="charactersCarousel"
      :items-to-show="3"
      :wrapAround="true"
      :itemsToScroll="1"
      :snapAlign="'center'"
      :modelValue="initialSlide"
      @loop="loopCarousel"
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
  <template v-else>
    <p class="loading-msg">Loading Characters</p>
  </template>
</template>

<script setup lang="ts">
import SwapiController from '../controller/SwapiController';
import { reactive, ref } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import CardComponent from './CardComponent.vue';
import 'vue3-carousel/dist/carousel.css';

const swapiController = new SwapiController();
const charactersCarousel = ref(null);

let initialSlide= ref(1)
let characters = ref([]);
let page = 1;
let loop = ref(false);

getCharacters();

function getCharacters() {
  if (characters.value.length == 0) {
    swapiController.getCharacters(page).then((data) => {
      characters.value = data;
      page++;
    });
  } else {
    swapiController.getCharacters(page).then((data) => {
      console.log('mais get');
      characters.value = [...characters.value, ...data];
      console.log(characters);
      initialSlide.value = characters.value.length-10
      page++
      loop.value = false;
    });
  }
}

function loopCarousel() {
  loop.value = true;
  getCharacters();
}

function formatDate(value: any) {
  return value === 'unknown' ? 'A long time ago?' : value;
}
</script>

<style></style>
