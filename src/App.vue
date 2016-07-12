<template>
  <div id="app">
    <a class="button" v-link="{ name: 'page', params: { pageNum: page } }" @click="next">NEXT</a>
    <list></list>
  </div>
</template>

<script>
  import List from './components/List';
  export default {
    components: {
      List
    },
    data() {
      return {
        page: parseInt(this.$route.params.pageNum, 10),
        limit: 10
      };
    },
    methods: {
      next() {
        this.page++;
      }
    }
  };
</script>

<style lang="scss">
  @import './assets/css/reset.scss';
  html, body {
    height: 100%;
  }
  
  .button{
    display: block;
    width: 100%;
    padding: 1em;
    text-align: center;
    color: #fff;
    background-color: #000;
  }
</style>
