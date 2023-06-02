<template>
  <nav>
    <a href="#">Star Wars Universe</a>
    <input placeholder="Pesquisar Personagens" />
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
nav {
  background-color: #000;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: fit-content;
  justify-content: space-around;
}

nav a {
  color: #fff;
  font-weight: 600;
  font-size: 3.2rem;
  line-height: 4.2rem;
  margin-top: 18px;
  margin-bottom: 2rem;
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
}

::placeholder {
  font-size: 1.4rem;
  line-height: 19px;
  text-align: end;
}
</style>
