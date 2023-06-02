<template>
  <div class="review-container">
    <div v-if="!sendedReview">
      <div class="name-email">
        <div class="input-container">
          <label for="name">Your Name</label>
          <input type="text" v-model="user.name" />
        </div>
        <div class="input-container">
          <label for="email">Your E-mail</label>
          <input type="email" v-model="user.email" />
        </div>
      </div>
      <div class="input-container">
        <label for="review">Review</label>
        <input class="input-review" type="text" v-model="user.review" />
      </div>
      <div class="button-container">
        <button @click="sendReview()">Publish</button>
      </div>
    </div>
    <div v-else> <p class="review-msg">Thank you for your review. May the force be with you!</p></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SwapiController from '../controller/SwapiController';

const swapiController = new SwapiController();
const sendedReview = ref(false)

const user = ref({
  name: null,
  email: null,
  review: null,
});

function sendReview(data) {
  sendedReview.value = true
  swapiController.postReview(data).then(() => {
    // sendedReview.value = true essa parte ficaria aqui juntamente com um modal após o envio do review, porém por questões de tempo não consegui elaborar
  });
}
</script>

<style scoped>
.review-container {
  @media only screen and (max-width: 600px) {
    margin-left: 20px;
  }
}
.name-email {
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
}
.input-container {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-container label {
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  margin-top: 20px;
}

.input-container input {
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  height: 39px;
  margin-top: 10px;
  width: 583px;

  @media only screen and (max-width: 600px) {
    width: 200px;
  }
}

.input-container input.input-review {
  height: 133px;
  margin-bottom: 40px;
  width: 100%;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.button-container button {
  background-color: #00ff66;
  border: none;
  font-size: 16px;
  padding: 9px 30px;
}

.review-msg{
  font-size: 24px;
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 50px;
  }
}
</style>
