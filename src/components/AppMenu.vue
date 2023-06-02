<template>
  <nav>
    <a href="/">Star Wars Universe</a>
    <div class="input-div">
      <input
        :class="displaySearch ? '' : 'search-mobile'"
        placeholder="Pesquisar Personagens"
      />
      <div
        v-if="!displaySearch"
        @click="toggleSearch"
        :class="displaySearch ? '' : 'search-responsive'"
      >
        <p class="search-button">Pesquisar</p>
      </div>
    </div>
    <div @click="toggleSearch" class="search-icon">
      <p class="search-button">Pesquisar</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const displaySearch = ref(true);

function toggleSearch() {
  displaySearch.value = !displaySearch.value;
}
</script>

<style scoped lang="scss">
nav {
  background-color: #000;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: fit-content;
  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    height: 50px;
    z-index: 50;
  }
}

nav a {
  color: #fff;
  font-weight: 600;
  font-size: 3.2rem;
  line-height: 4.2rem;
  margin-top: 18px;
  margin-bottom: 2rem;

  @media only screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
}

.input-div {
  @media only screen and (max-width: 600px) {
    z-index: 0;
    height: 20px;
    margin-bottom: 0px;
  }
}

.search-button {
  font-size: 1.2rem;
  color: #fff;
  margin-top: 18px;
  line-height: 4.2rem;
}

p.search-responsive {
  display: none;

  @media only screen and (max-width: 600px) {
    display: block;
    position: relative;
    right: 0px;
    z-index: 50;
    color: red;
  }
}

nav input {
  border-radius: 4px;
  border: none;
  font-size: 1.4rem;
  height: 25px;
  margin-top: 27px;
  margin-bottom: 24px;
  padding: 0px 10px;
  width: 274px;

  @media only screen and (max-width: 600px) {
    margin-top: 10px;
    height: 15px;
    display: none;
    z-index: 10;
  }
}

.search-mobile {
  @media only screen and (max-width: 600px) {
    display: block;
  }
}

::placeholder {
  font-size: 1.4rem;
  line-height: 19px;
  text-align: end;
}
</style>
