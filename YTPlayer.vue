<template>
    <div class="outer">
        <div v-if="videoId" class="playerBox">
            <div :class="'background'+(this.paused?'':' playing')">
                <button class="playButton" @click="()=>{playPause()}">
                    <img v-if="this.paused" class='icon' src="@/assets/icons/play.svg"/>
                    <img v-else class='icon' src="@/assets/icons/pause.svg"/>
                </button>
            </div>
            <iframe ref="player" width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&disablekb=1&fs=0&modestbranding=1&showinfo=0`" frameborder="0" enablejsapi="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div v-else>NOData</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";


export default Vue.extend({
    props: {
        link: {
            type: String,
            default: "",
            required: true
        }
    },
    data() {
        return {
            url: this.link,
            paused: true
        }
    },
    mounted() {
    },
    computed:{
        videoId():string|undefined{
            const url = this.url;
            if(url && url.match('http://(www.)?youtube|youtu\.be')){
                return url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
            }
        }
    },
    methods: {
        playfrom(){
            this.callPlayer("mute");
        },
        playPause(){
            this.paused? this.PlayVideo() : this.pauseVideo();
        },
        pauseVideo(){
            this.callPlayer("pauseVideo");
            this.paused = true;
        },
        PlayVideo(){
            this.callPlayer("playVideo");
            this.paused = false;
        },
        callPlayer(action: string, args = ""){
            if (this.$refs.player) {
                let player: any = this.$refs.player;
                player.contentWindow.postMessage(JSON.stringify({
                    'event': 'command',
                    'func': action,
                    'args': args
                }), '*');
            }
        }
    }
})
</script>
<style scoped>
    .outer{
        height: inherit;
        width: inherit;
    }
    .playerBox{
        height: inherit;
        overflow: hidden;
        position: relative;
    }
    iframe{
        width: 100%;
    }
    .background{
        width: 100%;
        height: 100%;
        background: #ff4d4de0;
        backdrop-filter: blur(13px) brightness(5) grayscale(0.6);
        position: absolute;
        display:flex;
        flex-flow: row wrap;
    }
    .playButton{
        background: #33333390;
        color: white;
        width:40px;
        text-align: center;
        margin-top:-260px;
        border: none;
        z-index: 2;
    }
    .playing{
        background: #6363ffde;
    }
    .icon{
        width: 20px!important;
        height: 20px;
        fill: white;
    }
</style>
