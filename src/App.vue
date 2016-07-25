<template>
  <div id="app">
    <a class="button" v-link="{ name: 'page', params: { pageNum: page } }" @click="previous">GO PREVIOUS<span>current: {{ page }}</span></a>
    <list :page="page" :limit="limit" :trigger.sync="finish"></list>
    <a class="button" v-link="{ name: 'page', params: { pageNum: page } }" @click="next">GO NEXT<span>current: {{ page }}</span></a>
    <div class="loader" v-show="!finish" :transition="up? 'up-start':'down-start'">
      <span>Loading</span>
    </div>
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
        finish: true,
        up: false
      };
    },
    methods: {
      next() {
        this.up = false;
        this.page++;
        this.finish = false;
        // 往下加载更多，滚动到顶部
        document.body.scrollTop = 0;
      },
      previous() {
        if (this.page === 1) {
          console.log('test');
          alert('已经是第一页');
        } else {
          this.page--;
          this.up = true;
          this.finish = false;
        }
      }
    },
    watch: {
      // 监听数据是否加载完成
      finish(val, oldVal) {
        // 当 finish 由 false 到 true，并且是向上加载的时候，需要滚动到底部
        if (!oldVal && val && this.up) {
          document.body.scrollTop = document.body.scrollHeight;
        }
      }
    }
  };
</script>

<style lang="scss">
  @import './assets/css/reset.scss';
  html, body {
    height: 100%;
  }

  .button,
  .loader {
    display: block;
    width: 100%;
    padding: 1em;
    text-align: center;
    color: #fff;
    background-color: #000;

    span{
      font-size: 12px;
      padding-left: 20px;
    }
  }

  .loader{
    position: fixed;
    left: 0;
    bottom: 0;

    span{
      display: block;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 50%;
      margin-top: -0.5em;
      left: 0;
      padding-left: 0;
    }
  }

  .down-start-transition {
    bottom: 0;
    height: 100%;
  }
  .down-start-enter {
    animation: expand .5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
  .down-start-leave {
    animation: collapse .5s 1 cubic-bezier(0, 1, 0, 1) both;
    top: 0;
    bottom: auto;
  }
  .up-start-transition {
    top: 0;
    height: 100%;
  }
  .up-start-enter {
    animation: expand .5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
  .up-start-leave {
    animation: collapse .5s 1 cubic-bezier(0, 1, 0, 1) both;
    top: auto;
    bottom: 0;
  }
  @keyframes expand {
    0% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes collapse {
    0% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
