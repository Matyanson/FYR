<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" placeholder="email" v-model="email">
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password">
      </div>
      <input type="submit" value="Login">
      <div class="error" v-if="error">{{error.message}}</div>
    </form>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    pressed(){
      this.error = '';
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then(user=>{
        console.log(user);
        this.$router.push('/');
      })
      .catch(error=>{
        this.error = error;
      })
    }
  },
})
</script>

<style>
.container {
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

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
