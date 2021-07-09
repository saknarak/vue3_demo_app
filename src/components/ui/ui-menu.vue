<template>
  <ul class="ui-menu">
    <li v-for="menu of menus" :key="menu.id" class="ui-menu-item submenu-right">
      <a href="#" class="d-flex px-2" @mouseenter="menuItemMouseEnter(menu)" @click.prevent.stop="menuItemClick(menu)">
        <slot>
          <ui-icon :icon="menu.icon" class="mr-2" />
          <div class="text">{{ menu.text }}</div>
        </slot>
        <ui-icon v-if="menu.items.length" class="more-icon" icon="chevron_right" />
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
  },
  setup() {
    const router = useRouter()

    // DATA
    const activeId = ref(0)

    // METHODS
    const menuItemMouseEnter = menu => {
      activeId.value = menu.id
    }
    const menuItemClick = menu => {
      if (!menu.to || (menu.items && menu.items.length > 0)) {
        return
      }
      activeId.value = 0
      pageEvent.$emit('page-click')
      console.log('goto', menu.to)
      router.push(menu.to)
    }

    // LIFE CYCLE EVENTS
    pageEvent.$on('page-click', () => {
      activeId.value = 0
    })

    onBeforeUnmount(() => {
      pageEvent.$off('page-click')
    })

    return {
      activeId,
      menuItemMouseEnter,
      menuItemClick,
    }
  },
}
</script>

<style lang="scss">
.ui-menu {
  position: absolute;
  background-color: #fff;
  z-index: 1;
  width: 200px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  > .ui-menu-item {
    height: 40px;
    line-height: 38px;
    border-top: 1px solid transparent;
    border-bottom: 1px dotted #ccc;
    &:hover {

    }
    > a .ui-icon {
      line-height: 38px;
    }
    > a .text {
      flex-grow: 1;
    }
    &.submenu-right {
      > .ui-menu {
        top: 0;
        left: 200px;
      }
    }
  }
}
</style>
