<template>
  <div class="container">
    <div class="wrap">
      <audio-component></audio-component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import audioComponent from '@/components/audioComponent.vue';

export default Vue.extend({
  data() {
    return {
    }
  },
  components: {
    audioComponent
  },
  created(){
    console.log("created");
  }
})
</script>

<style>
</style>
