<template>
  
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>

</template>

<script>

  import DefaulLayout from '@/layouts/DefaultLayout.vue'
  

  export default {
      name: 'App',
      computed:{
        layout() {
          return this.$route.meta.layout || 'DefaulLayout'
        }
      },
      components: {
        DefaulLayout 
      }
  }
</script>

<style lang="scss">
  body{
    background-color: rgba(255, 237, 187, 0.4);
  }
  *{
    box-sizing: border-box;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #212121;
    
  }
  .wrapper{
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  .section{
    padding: 100px 0px;

    &-title{
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
    }
  }
</style>
