<template>
  <div class="container">
    <div class="wrap">
      <h1>Login</h1>
      <form @submit.prevent="pressed">
        <div class="login">
          <input type="text" placeholder="email or Username" v-model="email">
        </div>
        <div class="password">
          <input type="password" placeholder="password" v-model="password">
        </div>
        <input type="submit" value="Login">
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
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    pressed(){
      this.error = '';
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then(()=>{
        this.$router.push('/');
      })
      .catch(error=>{
        this.error = error.message;
      })
      //loggin by username:
      let db = firebase.firestore();
      db.collection("users").where("username", "==", this.email).limit(1).get().then(querySnapshot => {
        if (!querySnapshot.empty) {
          //We know there is one doc in the querySnapshot
          const doc = querySnapshot.docs[0];
          let realEmail = doc.id;
          firebase.auth().signInWithEmailAndPassword(realEmail,this.password)
          .then(()=>{
            this.$router.push('/');
          })
          .catch(error=>{
            this.error = "Username and password don't match";
          })
        }
      })
      .catch(e=>{
        this.error = "Username and password don't match";
      })
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
