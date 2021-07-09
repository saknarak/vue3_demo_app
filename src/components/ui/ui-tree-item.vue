<template>
  <li class="ui-tree-item">
    <a href="#" class="item d-flex" @click.stop="onClick" @keypress.enter="onClick" @keypress.space="onClick">
      <ui-icon :icon="icon" class="icon flex-shrink-0" />
      <div class="text flex-grow-1">{{ item.text }}</div>
    </a>
    <ul v-if="item.items && item.items.length" v-show="item.open" class="list">
      <ui-tree-item v-for="subitem of item.items" :key="subitem.id" :item="subitem" @toggle="id => $emit('toggle', id)" @item-click="v => $emit('item-click', v)" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UiTreeItem',

  props: {
    item: {
      type: Object,
      default() {
        return {
          text: 'Menu',
        }
      },
      required: true,
    },
    state: {
      type: Object,
      default() {
        return new Map()
      },
    },
  }, // props

  emits: [
    'toggle',
    'item-click',
  ],

  computed: {
    hasChild() {
      return this.item.items && this.item.items.length
    },

    icon() {
      return !this.hasChild ? this.item.icon : (this.item.open ? 'expand_more' : 'chevron_right')
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()
      if (this.item.items) {
        this.$emit('toggle', this.item)
      } else {
        this.$emit('item-click', this.item)
      }
    },
  },
}
</script>
<style lang="scss">
@import "../../assets/vars.scss";

.ui-tree-item {
  min-height: 24px;
  line-height: 24px;
  padding: 0;
  > .item {
    // height: 22px;
    line-height: 22px;
    border: 1px solid transparent;
    > .icon {
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    > .text {
      display: block;
    }
    &:hover {
      // background-color: transparentize($color: $color-bg, $amount: 0.5);
      border: 1px dashed $color-bg;
      border-radius: 4px;
    }
  }
  > .list {
    padding-left: 8px;
  }
}
</style>
