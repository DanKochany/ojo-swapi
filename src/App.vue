<script setup lang="ts">
import AppMenu from './components/AppMenu.vue';

import { defineAsyncComponent, ref } from 'vue';

const CharactersCarousel = defineAsyncComponent(
  () => import('./components/CharactersCarousel.vue')
);
const MoviesCarousel = defineAsyncComponent(
  () => import('./components/MoviesCarousel.vue')
);

let noFilm = ref(true);
let filmId = ref()

function update(value: number){
  console.log(value)
  filmId.value = value
  noFilm.value = false;
};
</script>

<template>
  <div>
    <AppMenu />

    <div v-if="noFilm">
      <p class="section-title">Movies</p>

      <MoviesCarousel @film="update" />

      <p class="section-title characters">Characters</p>

      <CharactersCarousel />
    </div>
    <div v-else>
      <h1>mudou {{ filmId }}</h1>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');

* {
  margin: 0px;
  padding: 0px;
  font-family: 'Fira Code', monospace;
}

:root {
  font-size: 62.5%;
}

p.section-title::before {
  content: '';
  display: block;
  width: 550px;
  height: 1px;
  background: #000;
  left: 0;
  top: 50%;
  position: absolute;
}

p.section-title::after {
  content: '';
  display: block;
  width: 550px;
  height: 1px;
  background: #000;
  right: 0;
  top: 50%;
  position: absolute;
}

p.section-title {
  font-size: 24px;
  margin-bottom: 24px;
  margin-top: 30px;
  position: relative;
}

p.section-title.characters {
  margin-top: 60px;
}


p.loading-msg{
  font-size: 40px;
  height: 500px;
}
</style>
