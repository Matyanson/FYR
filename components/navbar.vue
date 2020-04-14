<template>
  <div class="nav">
      <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/database">Database</nuxt-link></li>
            <li><nuxt-link to="/upload">Upload song</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/help">Help from comunity</nuxt-link></li>
            <li v-if="!isLoggedIn"><nuxt-link to="/login">Login</nuxt-link></li>
            <li v-if="!isLoggedIn"><nuxt-link to="/register">Register</nuxt-link></li>
            <li v-if="isLoggedIn" class="right">{{`logged in as: ${email}`}}</li>
            <li v-if="isLoggedIn" v-on:click="logout"><a href="#">LogOut</a></li>
      </ul>
  </div>
</template>
<script>
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
    data() {
      return {
          isLoggedIn: false,
          email: ''
      }
  },
  mounted() {
      this.setupFirebase();
  },
  methods: {
      setupFirebase(){
          firebase.auth().onAuthStateChanged(user=>{
              if(user){
                  this.isLoggedIn = true;
                  this.email = user.email;
              }
              else{
                  this.isLoggedIn = false;
                  this.email = '';
              }
          })
      },
      logout(){
          firebase.auth().signOut().then(()=>{
              this.$router.push('/');
          });
      }
  }
})
</script>
<style scoped>
    .right{
        margin-left: auto;
    }
    .nav{
        position: fixed;
        width: 100%;
        padding: 0 15px;
        min-height: 40px;
        background: #222;
        color: #c7ced4;
        display: flex;
        flex-flow: row;
    }
    .nav ul, .nav ul span{
        margin:0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .nav li{
        list-style: none;
    }
    .nav a{
        padding: 2px 5px;
        margin:3px;
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        vertical-align: middle;
        color: aliceblue;
        background: #333;
        transition: all ease-in-out 0.2s;
    }
    .nav a:hover{
        background: #555;
    }
</style>
