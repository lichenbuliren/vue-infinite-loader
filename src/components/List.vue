<template>
  <ol>
    <li v-for="news of list.data">
      <p class="title">{{ news.title }}</p>
      <p class="date">发布日期：{{ news.create_at }}</p>
      <p class="author">By: {{ news.author.loginname }}</p>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
  ol{
    padding-left: 30px;

    li{
      padding:10px 30px;
      padding-left: 0;
      border-top: 1px solid rgba(0, 0, 0, .2);
      margin-bottom: 10px;
      line-height: 1.6;

      &:first-child{
        border-top: 0;
      }

      p{
        margin-bottom:4px;
      }

      .title{
        font-size: 18px;
      }

      .date{
        font-size: 14px;
        color: #999;
      }

      .author{
        font-size: 16px;
      }
    }
  }
</style>

<script>
  import newsApi from '../api/newsApi';

  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      trigger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        list: [],
        limit: 10
      };
    },
    // 初次加载的时候，获取默认的第一页数据
    created() {
      this.get();
    },
    watch: {
      page() {
        this.get();
      }
    },
    methods: {
      get() {
        newsApi.getList({
          page: this.page,
          limit: this.limit
        }, (err, list) => {
          if (err) {
            console.log(err);
          } else {
            list.data.forEach((data) => {
              const d = new Date(data.create_at);
              // ES6 模板字符串
              data.create_at = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            });
            this.list = list;

            // 延时触发滚动
            setTimeout(() => {
              this.trigger = true;
            }, 300);
          }
        });
      }
    }
  };
</script>
