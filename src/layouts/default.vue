<template>
  <app-layout class="celims-app">
    <router-view />
  </app-layout>
</template>

<script>
export default {
  beforeCreate() {
    // TODO: check session
  },
}
</script>

<style lang="scss">
.celims-app {
  .app-header {
    .app-top {
      height: 40px;
      line-height: 40px;
    }
    .app-nav {
      height: 40px;
      line-height: 40px;
      background-color: #eee;
    }
  }
}
</style>
