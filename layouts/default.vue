<template>
  <div>
    <MyNavbar />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyNavbar from './../components/navbar.vue'

export default Vue.extend({
  components:{
    MyNavbar
  }
})
</script>

<style>
.wrap{
  background: #ffffffc4;
  width: 80vw;
  padding: 50px 0;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: center;
}

html {
  min-height: 100vh;
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: linear-gradient(
    45deg,
    #00000017 0%,
    #00000017 20%,
    #00000010 20%,
    #00000010 40%,
    #00000007 40%,
    #00000007 60%,
    #00000010 60%,
    #00000010 80%,
    #00000017 80%,
    #00000017 100%
  ),
  linear-gradient(
    22.5deg,
    #00000017 0%,
    #00000017 20%,
    #00000010 20%,
    #00000010 40%,
    #00000007 40%,
    #00000007 60%,
    #00000010 60%,
    #00000010 80%,
    #00000017 80%,
    #00000017 100%
  ),
  linear-gradient(
    0deg,
    #00000017 0%,
    #00000017 20%,
    #00000010 20%,
    #00000010 40%,
    #00000007 40%,
    #00000007 60%,
    #00000010 60%,
    #00000010 80%,
    #00000017 80%,
    #00000017 100%
  ),
  linear-gradient(90deg,#ff4d4d,#6363ff);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  min-height: 100vh;
  padding-top: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
