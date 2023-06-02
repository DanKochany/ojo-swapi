<script setup lang="ts">
import AppMenu from './components/AppMenu.vue';
import { defineAsyncComponent, ref } from 'vue';
import SwapiController from './controller/SwapiController';
import CardComponent from './components/CardComponent.vue';
import { Slide, Carousel, Navigation } from 'vue3-carousel';
import { formatDate } from './mixins/mixins';
import ReviewComponent from './components/ReviewComponent.vue';
import Loader from './components/Loader.vue';

const swapiController = new SwapiController();

const CharactersCarousel = defineAsyncComponent(
  () => import('./components/CharactersCarousel.vue')
);
const MoviesCarousel = defineAsyncComponent(
  () => import('./components/MoviesCarousel.vue')
);

const noFilm = ref(true);
const filmId = ref();
const loadingMovie = ref(true);
const filmPage = ref(null);
const charactersOfMovie: Array = ref([]);
let counterCharacters = ref(0);

const movieCharacterBreakpoints = ref({
  300: {
    itemsToShow: 1,
  },
  600: {
    itemsToShow: 3,
  },
});
const movieCharacterSettings = ref({
  itemsToShow: '3',
  wrapAround: true,
  itemsToScroll: 1,
  snapAlign: 'center',
  modelValue: 0,
});

const imageUrl = (id: number) =>
  new URL(`/src/assets/episode_${id}.jpg`, import.meta.url).toString();

function SwCorrectOrder(value: number) {
  switch (value) {
    case 1:
      return 4;
    case 2:
      return 5;
    case 3:
      return 6;
    case 4:
      return 1;
    case 5:
      return 2;
    case 6:
      return 3;
  }
}

async function update(value: number) {
  filmId.value = SwCorrectOrder(value);
  noFilm.value = false;

  return await swapiController.getMovies(filmId.value).then((data) => {
    filmPage.value = data.data;
    counterCharacters = data.data.characters.length;
    data.data.characters.forEach((element: any) => {
      const id = element.split('e/')[1];

      swapiController.getCharactersById(id).then((data) => {
        charactersOfMovie.value.push(data.data);
        if (charactersOfMovie.value.length == counterCharacters) {
          loadingMovie.value = false;
        }
      });
    });
  });
}
</script>

<template>
  <div>
    <AppMenu />
    <div>
      <div v-if="noFilm" class="movies">
        <p class="section-title">Movies</p>

        <MoviesCarousel @film="update" />

        <p class="section-title characters">Characters</p>

        <CharactersCarousel />
      </div>
      <div class="movie" v-else>
        <div v-if="loadingMovie">
          <Loader />
        </div>
        <div v-else>
          <p class="section-title">{{ filmPage.title }}</p>
          <div class="movie-description">
            <div>
              <p class="title-content">Descrição</p>
              <p class="content">{{ filmPage.opening_crawl }}</p>
              <div class="movie-info">
                <div class="release-date">
                  <p class="title-content">Release Date</p>
                  <p class="content">{{ filmPage.release_date }}</p>
                </div>
                <div class="production">
                  <div class="director">
                    <p class="title-content">Director</p>
                    <p class="content">{{ filmPage.director }}</p>
                  </div>
                  <div class="producer">
                    <p class="title-content">Producer</p>
                    <p class="content">{{ filmPage.producer }}</p>
                  </div>
                </div>
              </div>
            </div>
            <img :src="imageUrl(filmPage.episode_id)" />
          </div>

          <p class="section-title">Characters of the Movie</p>

          <Carousel
            ref="charactersCarousel"
            :settings="movieCharacterSettings"
            :breakpoints="movieCharacterBreakpoints"
          >
            <Slide v-for="character in charactersOfMovie" :key="character">
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

          <p class="section-title">Write a Review</p>
          <ReviewComponent />
        </div>
      </div>
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
  width: 400px;
  height: 1px;
  background: #000;
  left: 0;
  top: 50%;
  position: absolute;
}

p.section-title::after {
  content: '';
  display: block;
  width: 400px;
  height: 1px;
  background: #000;
  right: 0;
  top: 50%;
  position: absolute;
}

@media only screen and (max-width: 800px) {
  p.section-title::after,
  p.section-title::before {
    display: none;
  }
}

p.section-title {
  font-size: 24px;
  margin-bottom: 24px;
  margin-top: 30px;
  position: relative;

  @media only screen and (max-width: 600px) {
    top: 60px;
    left: 20vw;
    font-size: 18px;
    margin-bottom: 90px;
    width: 200px;
  }
}

p.section-title.characters {
  margin-top: 60px;
}

p.loading-msg {
  font-size: 40px;
  height: 500px;
}

.movie {
  max-width: 1200px;
  margin-top: 100px;

  @media only screen and (max-width: 600px) {
    width: 90vw;
    margin-top: 60px;
  }
}

.movie-description {
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
}

p.title-content {
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: left;
  margin-bottom: 20px;

  @media only screen and (max-width: 600px) {
    margin-left: 20px;
    margin-bottom: 5px;
  }
}

p.content {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  max-width: 457px;
  text-align: left;

  @media only screen and (max-width: 600px) {
    margin-left: 20px;
    width: 80vw;
  }
}

.movie-description img {
  border-radius: 15px;
  height: 486px;
  width: 336px;

  @media only screen and (max-width: 600px) {
    margin-left: 20px;
    width: 230px;
    height: 280px;
  }
}

.movie-info {
  margin-top: 100px;
  margin-bottom: 40px;
}

.movie-info .release-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
}

.movie-info .production {
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
}

.director > .title-content {
  text-align: left;
}

.producer > .title-content {
  text-align: right;

  @media only screen and (max-width: 600px) {
    margin-top: 20px;
    text-align: left;
  }
}
</style>
