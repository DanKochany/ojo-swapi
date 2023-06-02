<template>
  <div>
    <div>
      <slot>
        
      </slot>
    </div>
    <p class="title"  :class="movie ? '' : 'title-radius'">{{ title }}</p>

    <div class="card">
  
      <div class="card-content">
        <template v-if="movie">
  
          <div class="date">
            <p>Release Date</p>
            <p>{{ release }}</p>
          </div>
  
          <div class="director">
            <p>Director</p>
            <p>{{ director }}</p>
          </div>
  
        </template>
  
        <template v-else>
  
          <div class="date">
            <p>Data de Nascimento</p>
            <p>{{ birthDate }}</p>
          </div>
  
          <div class="height">
            <p>Altura</p>
            <p>{{ height }}</p>
          </div>
  
        </template>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  
  data(){
    return{
      
    }
  },
  
  props: {
    title: String,
    img: Boolean,
    release: String,
    imgSource: String,
    director: String,
    movie: Boolean,
    height: String,
    birthDate: String,
  },

};
</script>

<style scoped>

.card-content{
  padding: 8px 18px 12px;
  font-size: 12px;
}
.card {
  border: 1px solid #cfcfcf;
  border-radius: 0px 0px 10px 10px;
  border-top-color: #ffc700;
  height: 106px;
  margin-right: 120px;
  margin-left: 120px;
  text-align: left;
  padding: 0px;

  width: 270px;
}

p.title {
  background-color: #ffc700;
  border: 1px solid #ffc700;
  color: #fff;
  font-size: 14px;
  line-height: 19px;
  text-align: left;
  padding: 8px 18px;
  position: relative;
  left: 120px;
  

  width: 270px;
}

.date{
  margin-bottom: 10px;
}



.title-radius{
  border-radius: 7px 7px 0px 0px;
}

</style>
