<template>
  <ol>
    <li v-for="news of list">
      <p class="title">{{ news.title }}</p>
      <p class="date">{{ news.create_at }}</p>
      <p class="author">By: {{ news.author.loginname }}</p>
    </li>
  </ol>
</template>

<script>
</script>