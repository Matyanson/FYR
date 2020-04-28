<template>
  <div>
      <div v-if="audio">
          <h2>{{audio.author}} - {{audio.name}}</h2>
          <p>{{Math.floor(audio.seconds/60)}}:{{audio.seconds%60}}</p>
      </div>
      <div v-else>NOData</div>
  </div>
</template>
<script>
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
    props: {
        data: Object
    },
    data() {
        return {
        audio: this.data
        }
    },
    mounted() {
        console.log("hello from audio");
    },
    methods: {
    }
})
</script>
<style scoped>
    
</style>
