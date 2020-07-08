<template>
  <div class="container">
    <div class="wrap">
      <h1>Database</h1>
        <form @submit.prevent="pressed">
          sort by: <select v-model="form.sortBy">
            <option>views</option>
            <option>relevance</option>
          </select>
          monetization: <input type="number" v-model="form.monetization">
          <input type="text" placeholder="search Music on youtube" v-model="form.search">
          <input type="submit" value="Search">
        </form>
        <button @click="()=>{test()}" >test</button>
        <div v-for="(x, index) in songs" :key="index">
          <audio-holder :data="x" />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import axios from 'axios';

import Song from '../classes/Song';
import Sound from '../classes/Sound';
import IDPair from '@/classes/IDPair';
import audioHolder from '../components/audioHolder.vue';
import YTPlayer from '../components/YTPlayer.vue';
import multiSelect from '@/components/MultiSelectID.vue';
import tagsSelect from '@/components/tagsSelectID.vue';
import { getMusic } from '../functions/lib';
const YTGenresData = require('../static/YTMusicGenres.json');
const SFGenre = require('../static/SFGenre.json');

export default Vue.extend({
  data() {
    return {
      songs: [] as Song[],
      sound: [] as Sound[],
      form:{
        search: "",
        type: 0,
        monetization: 1,
        genre: [] as any[],
        mood: [] as any[],
        tags: [] as any[],
        sortBy: "relevance",
        durationStart: -1,
        durationEnd: -1,
        bpmStart: -1,
        bpmEnd: -1,
      }
    }
  },
  methods: {
    test(){
      console.log(this.form);
    },

    async pressed(){
      const db = firebase.firestore();
      let getMusic = firebase.functions().httpsCallable('getMusic');
      let res = await getMusic(this.form);
      let data = res.data;
      console.log(data);
    },
    
    async Load(){
      let db = firebase.firestore();
      
      let allTagsCollection = await db.collection('tags').get();
      for(const doc of allTagsCollection.docs){
        let data = doc.data();
        this.form.tags.push({
          id: doc.id,
          text: data.name
        });
      }
      let allMoodCollection = await db.collection('mood_tag').get();
      for(const doc of allMoodCollection.docs){
        let data = doc.data();
        this.form.mood.push({
          id: doc.id,
          text: data.name
        });
      }
      let allGenresCollection = await db.collection('music_genres').get();
      for(const doc of allGenresCollection.docs){
        let data = doc.data();
        this.form.genre.push({
          id: doc.id,
          text: data.name
        });
      }
    },
    async getDoc(collection: string, id: string){
      let db = firebase.firestore();
      let snapshot = await db.collection(collection).doc(id).get();
      return snapshot.data();
    }
  },
  async mounted() {
    //await this.Load();
  },
  components :{
    audioHolder,
    YTPlayer,
    multiSelect,
    tagsSelect
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
