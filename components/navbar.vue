<template>
  <div class="nav">
      <ul>
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/database">Database</nuxt-link></li>
          <li><nuxt-link to="/upload">Upload song</nuxt-link></li>
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/help">Help from comunity</nuxt-link></li>
          <span v-if="!isLoggedIn">
            <li><nuxt-link to="/login">Login</nuxt-link></li>
            <li><nuxt-link to="/register">Register</nuxt-link></li>
          </span>
          <span v-else>
            <li>{{`logged in as: ${email}`}}</li>
            <li v-on:click="logout">LogOut</li>
          </span>
      </ul>
  </div>
</template>
<script>
import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.email = firebase.auth().currentUser.email;
        }
    },
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
    .nav{
        position: fixed;
    }
</style>
