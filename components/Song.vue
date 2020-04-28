<template>
  <div>
      <div v-if="song">
          <h2>{{song.author}} - {{song.name}}</h2>
          <p>{{Math.floor(song.seconds/60)}}:{{song.seconds%60}}</p>
          <p>{{song.description}}</p>
          <p>{{song.bpm}}bpm</p>
          <p>source: <a :href="song.links.youtube">{{song.links.youtube}}</a></p>
          <p>genres: {{song.genres.toString()}}</p>
          <p>mood: {{song.mood.toString()}}</p>
          <p>tags: {{song.tags.toString()}}</p>
      </div>
      <div v-else>NOData</div>
  </div>
</template>
<script>
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";
import Song from "../classes/Song";

export default Vue.extend({
    props: {
        data: Object
    },
    data() {
        return {
        song: this.data
        }
    },
    mounted() {
        console.log("hello from song");
        console.log(this.song);
    },
    methods: {
    }
})
</script>
<style scoped>
    
</style>
