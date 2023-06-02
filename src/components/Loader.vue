<template>
  <div class="background-loader">
    <div class="hilt"></div>
    <div class="black-hilt"></div>
    <div class="red-button"></div>
    <div class="loader"></div>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}



body {
  min-height: 100vh;
  width: 100vw;
}

.background-loader{
  background-color: #222;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 80px;
  width: 100vw;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  @media only screen and (max-width: 600px) {
      top: 50px
  }
}


.hilt{
  width: 100px;
  height: 12px;
  background-color: #cfcfcf;
  position: relative;
  left: 50px;
  bottom: 40px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  @media only screen and (max-width: 600px) {
      left: 10px
  }
  
}

.black-hilt{
  width: 40px;
  background-color: #6b6b6b86;
  height: 10px;
  position: relative;
  left: 0px;
  bottom: 40px;
  @media only screen and (max-width: 600px) {
      left: -15px
  }
}

.loader {
  position: relative;
  bottom: 40px;
  right: 190px;
  width: 400px;
  height: 8px;
  border-radius: 10px;
  @media only screen and (max-width: 600px) {
      right: 132px;
  }
}

.loader:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(77, 253, 24);
  box-shadow: 0 0 15px 15px rgba(77, 253, 24, 0.42);
  transform-origin: left;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  animation: animarLoader 3s linear infinite;
}

@keyframes animarLoader {
  0%,
  20% {
    transform: scaleX(0);
  }
  30% {
    transform: scaleX(1);
  }
  90%{
    transform: scaleX(1)
  }
  100% {
    transform: scaleX(0);
  }
}
</style>
