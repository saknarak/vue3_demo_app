<template>
  <nav class="app-nav">
    <ui-menu-bar :menus="menus" />
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import uiMenuBar from '../ui/ui-menu-bar.vue'

export default {
  components: { uiMenuBar },
  setup() {
    const store = useStore()
    return {
      menus: store.getters['ui/menusWithAcl'],
    }
  },
}
</script>

<style lang="scss">
.menu-bar {
  display: flex;
  line-height: 40px;
  > .menu-bar-item {
    a {
      display: block;
      padding: 0 8px;
      &:hover {
        background-color: red;
      }
    }
    > .submenu {
      display: none;
    }
  }
}
</style>
