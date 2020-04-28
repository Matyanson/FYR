<template>
  <div class="container">
    <div class="wrap">
      <h1>Upload</h1>
    <form @submit.prevent="pressed">
        <input type="text" placeholder="name" v-model="songData.name">
        <input type="text" placeholder="author of the song" v-model="songData.author">
        <input type="text" placeholder="description" v-model="songData.description">
        <multi-select :data="allTags" :getItems.sync="songData.tags" placeholder="select Tags" :custom="true" />
        <multi-select :data="allMood" :getItems.sync="songData.mood" placeholder="select Mood Tags"/>
        <multi-select :data="allGenres" :getItems.sync="songData.genres" placeholder="select Genres"/>
        <input type="submit" value="Upload">
        <div class="error" v-if="error">{{error}}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import IDPair from '../classes/IDPair';
import MultiSelect from '../components/MultiSelectID.vue';

export default Vue.extend({
  data() {
    return {
      songData: {
        name : "",
        author: "",
        description: "",
        seconds: 0,
        bpm: 0,
        links: [""],
        genres: [],
        mood: [],
        tags: [],
      },
      error: "",
      allTags: [] as IDPair[],
      allGenres: [] as IDPair[],
      allMood: [] as IDPair[],
    }
  },
  computed: {

  },
  methods: {
    pressed(){
      let db = firebase.firestore();
      console.log(this.songData);
      db.collection("songs").add(this.songData);
    },
    async Load(){
      let db = firebase.firestore();
      
      let allTagsCollection = await db.collection('tags').get();
      for(const doc of allTagsCollection.docs){
        let data = doc.data();
        this.allTags.push({
          id: doc.id,
          text: data.name
        });
      }
      let allMoodCollection = await db.collection('mood_tag').get();
      for(const doc of allMoodCollection.docs){
        let data = doc.data();
        this.allMood.push({
          id: doc.id,
          text: data.name
        });
      }
      let allGenresCollection = await db.collection('music_genres').get();
      for(const doc of allGenresCollection.docs){
        let data = doc.data();
        this.allGenres.push({
          id: doc.id,
          text: data.name
        });
      }
    },
  },
  async mounted() {
    await this.Load();
  },
  components: {
    MultiSelect
  },
})
</script>

<style scoped>
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
