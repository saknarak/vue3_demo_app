<template>
  <ul class="ui-menu-bar d-flex px-2">
    <li v-for="menu of menus" :key="menu.id" class="ui-menu-bar-item">
      <a href="#" class="d-flex px-2" @mouseenter="menuBarItemMouseEnter(menu)" @click.stop.prevent="menuBarItemClick(menu)">
        <slot>
          <ui-icon :icon="menu.icon" class="mr-2" />
          <div>{{ menu.text }}</div>
        </slot>
      </a>
      <ui-menu :menus="menu.items" v-show="menu.id === activeId" />
    </li>
  </ul>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import pageEvent from './ui-event'

export default {
  props: {
    menus: {
      type: Array,
      default() {
        return []
      },
    },

    stateMap: {
      type: Map,
      default() {
        return new Map()
      },
    },
  },

  setup(props) {
    const router = useRouter()

    // DATA
    const activeId = ref(0)

    // METHODS
    const menuBarItemClick = menu => {
      activeId.value = menu.id
      if (!menu.to || (menu.items && menu.items.length > 0)) {
        return
      }
      activeId.value = 0
      pageEvent.$emit('page-click')
      console.log('goto', menu.to)
      router.push(menu.to)
    }

    const menuBarItemMouseEnter = menu => {
      activeId.value = menu.id
    }

    pageEvent.$on('page-click', () => {
      activeId.value = 0
    })

    // EVENTS
    onBeforeUnmount(() => {
      pageEvent.$off('page-click')
    })

    return {
      // data
      activeId,

      // methods
      menuBarItemClick,
      menuBarItemMouseEnter,
    }
  },
}
</script>

<style lang="scss">
.ui-menu-bar {
  .ui-menu-bar-item {
    > a .ui-icon {
      line-height: 40px;
    }
    line-height: 40px;
  }
}
</style>
