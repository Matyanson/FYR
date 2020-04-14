<template>
  <div class="container">
    <div class="wrap">
      <h1>Register</h1>
      <form @submit.prevent="pressed">
        <div class="name">
          <input type="text" placeholder="Nickname" v-model="name">
        </div>
        <div class="login">
          <input type="email" placeholder="email" v-model="email">
        </div>
        <div class="password">
          <input type="password" placeholder="password" v-model="password">
        </div>
        <input type="submit" value="Register">
        <div class="error" v-if="error">{{error}}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    pressed(){
      console.log("registring..")
      console.log(this.name);
      this.error = '';
      if(this.name.length > 1){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user=>{
          
        console.log("user registered");
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
            console.log("user logged");
            this.$router.push('/');
          })
        })
        .catch(error=>this.error = error.message);
      }else {
        console.log("spatne");
        this.error = "Username has to be 2 characters or longer";
      }
    }
  },
})
</script>

<style>
input[type=text], input[type=password], input[type=email], input[type=number] select {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 80%;
  background-color: #5050ff;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color:#6363ff;
}

.error{
  color: #ff4d4d
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
