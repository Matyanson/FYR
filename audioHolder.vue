<template>
  <div>
      <div v-if="song" class="background">
          <div class="stripe youtube"></div>
          <img :src="song.img">
          <div class="player">
                <div class="info">
                    <div class="name">
                        <a class="title" :href="song.links.youtube">{{song.name}}</a>
                        <div class="author">{{song.author}}</div>
                    </div>
                    <div>{{song.seconds !== -1? `${Math.floor(song.seconds/60)}:${song.seconds%60}` : '--'}}</div>
                    <div>{{song.bpm !== -1? song.bpm : '--'}}</div>
                    <img v-if="song.monetization === 1" class="icon" src="@/assets/icons/creative-commons.svg"/>
                </div>
                <y-t-player :link="song.links.youtube" />
          </div>
      </div>
      <div v-else>NOData</div>
  </div>
</template>
<script>
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";
import Song from "../classes/Song";
import YTPlayer from "../components/YTPlayer.vue";

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
    },
    methods: {
    },
    components: {
        YTPlayer
    }
})
</script>
<style scoped>
    .background{
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        height: 50px;
        margin: 5px 30px;
        border-radius: 10px;
        overflow: hidden;
    }
    .background img{
        width: 50px;
        object-fit: cover;
    }
    .background .player{
        flex: 1;
        position: relative;
    }
    .player .info{
        display: flex;
        flex-flow: row;
        align-items: stretch;;
        height: calc(100% - 50px);
        top:0;
        left: 50px;
        position: absolute;
        z-index: 1;
    }
    .info .name{
        width: 100%;
        height: inherit;
    }
    .info .name .title{
        font-size: 1.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: inherit;
        max-width: 500px;
        color: #fff;
    }
    .info .name .author{
        font-size: 1rem;
        text-align: left;
    }
    .stripe{
        width: 10px;
    }
    .youtube{
        background:#FF0000;
    }
    .icon{
        height: 20px;
        width: 20px!important;
        object-fit: cover;
    }
</style>
