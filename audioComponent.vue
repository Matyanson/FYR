<template>
  <div>
      <div id="player"></div>
      <button @click="play" > play</button>
  </div>
</template>
<script>
import Vue from 'vue'
import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
    props: {
    },
    data() {
        return {
            videoId: 'ulCdoCfw-bY'
        }
    },
    mounted() {
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    window.onYouTubeIframeAPIReady = function () {
        window.player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'ulCdoCfw-bY',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        enablejsapi: 1
        });
    }

    // 4. The API will call this function when the video player is ready.
    const onPlayerReady = function (event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    let done = false;
    const onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
        }
    }
    const stopVideo = function () {
        player.stopVideo();
    }


    },
    methods: {
      play(){
        console.log(Object.keys(player));
        player.stopVideo();
      }


  }
})
</script>
<style scoped>
    
</style>
