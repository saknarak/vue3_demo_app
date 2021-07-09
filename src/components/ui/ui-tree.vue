<template>
  <div class="ui-tree d-flex flex-column" style="overflow-y: hidden;">
    <div class="search-panel flex-shrink-0 pa-1">
      <ui-input ref="input" prefix-icon="search" :model-value="keyword" @update:modelValue="onKeyword" @clear="doClear" clearable />
    </div>
    <div class="scroll flex-grow-1" style="overflow-y: scroll">
      <ul class="list">
        <ui-tree-item v-for="item of filteredItems" :key="item.id" :item="item" @toggle="doToggle" @item-click="v => $emit('item-click', v)" />
      </ul>
    </div>
  </div>
</template>

<script>

function hasItem(item, regex) {
  if (item.items && item.items.length) {
    let items = item.items.filter(x => hasItem(x, regex))
    if (items.length) {
      return {
        ...item,
        items,
        open: true,
      }
    }
  } else if (item.text && regex.test(item.text)) {
    return {
      ...item,
      open: true,
    }
  }
  return null
}

export default {
  name: 'UiTree',

  props: {
    items: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },

  emits: [
    'item-click',
    'toggle',
  ],

  data() {
    return {
      keyword: '',
      keyword2: '',
      state: new Map(),
      treeItems: this.buildTreeItem(),
    }
  },

  computed: {
    filteredItems() {
      if (!this.keyword2) {
        return this.treeItems
      }
      let regex = new RegExp(this.keyword2.trim().replace(/\s+/, '\\.+'), 'i')
      let out = []
      for (let item of this.treeItems) {
        let ok = hasItem(item, regex)
        if (ok) {
          out.push(ok)
        }
      }
      return out
    },
  },

  watch: {
    items() {
      this.treeItems = this.buildTreeItem()
    },
  },

  beforeUnmount() {
    clearTimeout(this.keywordTimer)
  },

  methods: {
    // PUBLIC METHODS
    doClear() {
      this.keyword = ''
      this.keyword2 = ''
      this.$refs.input.focus()
    },

    // PRIVATE
    buildTreeItem() {
      let out = []
      let itemMap = new Map()
      for (let item of this.items) {
        let menuItem = {
          ...item,
          open: false,
        }
        let parentItem = menuItem.parentId ? itemMap.get(menuItem.parentId) : null
        if (!parentItem) {
          out.push(menuItem)
        } else {
          if (!parentItem.items) {
            parentItem.items = []
          }
          parentItem.items.push(menuItem)
        }
        itemMap.set(menuItem.id, menuItem)
      }
      return out
    },

    doToggle(item) {
      item.open = !item.open
    },

    onKeyword(v) {
      this.keyword = v
      clearTimeout(this.keywordTimer)
      this.keywordTimer = setTimeout(() => {
        this.keyword2 = this.keyword
      }, 200)
    },
  },
}
</script>

<style lang="scss">
.ui-tree {
  > .list {
    padding-left: 8px;
  }
}
</style>
