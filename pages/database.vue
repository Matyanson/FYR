<template>
  <div class="container">
    <div class="wrap">
      <h1>Database</h1>
        <song-component v-for="(x, index) in songs" :key="index" :data="x" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Song from '../classes/Song';
import Sound from '../classes/Sound';
import songComponent from '../components/Song.vue';

export default Vue.extend({
  data() {
    return {
      songs: [] as Song[],
      sound: [] as Sound[]
    }
  },
  methods: {
    async Load(){
      let db = firebase.firestore();
      
      let allSongs = await db.collection('songs').get();
      for(const doc of allSongs.docs){
        const data = doc.data();
        //save genres
        let genres = []
        for(const id of data.genres){
          let g = await this.getDoc('music_genres', id);
          genres.push(g?.name);
        }
        //save mood
        let mood = []
        for(const id of data.mood){
          let m = await this.getDoc('mood_tag', id);
          mood.push(m?.name);
        }
        //save tags
        let tags = [];
        for(const id of data.tags){
          let t = await this.getDoc('tags', id);
          tags.push(t?.name);
        }
        //push song data to app
        this.songs.push({
          author: data.author,
          name: data.name,
          bpm: data.bpm,
          description: data.description,
          seconds: data.seconds,
          monetization: data.monetization,
          genres: genres,
          links: data.links,
          mood: mood,
          source: data.source,
          tags: tags
        }as Song);
      }
      console.log(this.songs);
    },
    async getDoc(collection: string, id: string){
      let db = firebase.firestore();
      let snapshot = await db.collection(collection).doc(id).get();
      return snapshot.data();
    }
  },
  async mounted() {
    await this.Load();
  },
  components :{
    songComponent
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
