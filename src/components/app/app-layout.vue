<template>
  <ui-app class="app-layout">
    <header class="app-header">
      <app-topbar />
      <app-menu />
    </header>
    <main class="px-2 py-2">
      <slot />
    </main>
  </ui-app>
</template>

<script>
import { onBeforeUnmount } from 'vue'
import mqtt from '../../lib/mqtt'

export default {

  setup(props, { attrs, slots, emit }) {
    mqtt.$on('celims/ts', (topic, payload) => {
      console.log(topic, payload)
    })

    onBeforeUnmount(() => {
      mqtt.$off('celims/ts')
    })
  },

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
  main {
    background-color: #e5e5e5;
  }
}
</style>
