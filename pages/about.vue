<template>
  <div class="container">
    <div class="wrap">
      <h1>About</h1>
      <form @submit.prevent="pressed">
        <input type="text" placeholder="name of the genre" v-model="name">
        <input type="text" placeholder="index of the genre" v-model="id">
        <input type="submit" value="Add">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default Vue.extend({
  data() {
    return {
      name: "",
      id: ""
    }
  },
  methods: {
    pressed(){
      let db = firebase.firestore();
      let genreRef = db.collection("music_genres").doc(this.id);
        genreRef.set({
          name: this.name,
          searched: 0,
          used: 0
        });
      this.name = "";
      this.id = "";
    }
  },
})
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
