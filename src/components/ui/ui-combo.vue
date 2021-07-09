<template>
  <ui-input
    ref="input"
    :model-value="modelValue"
    class="ui-combo"
    @update:modelValue="onModelValueUpdate"
    @keydown="onKeyDown"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template #outer-suffix v-if="showOptions">
      <ui-list class="options elevation-2" dense>
        <ui-list-item
          v-for="(item, idx) of filteredItems.slice(offset, offset + numDisplay)"
          :key="item"
          class="px-2"
          :class="{ selected: idx + offset === selectedIdx }"
          @click.stop="onItemClick(item)"
        >
          <slot name="item" :item="item">
            {{ item }}
          </slot>
        </ui-list-item>
      </ui-list>
    </template>
  </ui-input>
</template>

<script>
export default {
  name: 'UiCombo',

  props: {
    modelValue: [Number, String],
    items: {
      type: Array,
      default() {
        return []
      },
    },
    numDisplay: {
      type: Number,
      default: 10,
    },
    selectFirst: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'update:modelValue',
  ],

  data() {
    return {
      keyword: '',
      showOptions: false,
      selectedIdx: -1,
      offset: 0,
    }
  },

  computed: {
    filteredItems() {
      if (!this.modelValue) {
        return this.items
      }
      return this.items.filter(x => x.indexOf(this.modelValue) >= 0)
    },
  },

  methods: {
    // PUBLIC
    focus() {
      this.$refs.input.focus()
    },

    onModelValueUpdate(value) {
      this.showOptions = true
      this.$emit('update:modelValue', String(value).trim())
    },

    onItemClick(item) {
      this.showOptions = false
      this.prevValue = this.modelValue
      this.$emit('update:modelValue', item)
    },

    onKeyDown(evt) {
      if (evt.keyCode === 27) {
        this.$emit('update:modelValue', this.prevValue)
        evt.stopPropagation()
        this.showOptions = false
        return
      }
      // 40 = DOWN, 38 = UP
      if (evt.keyCode === 40 || evt.keyCode === 38) {
        this.showOptions = true
        this.selectItem(evt.keyCode === 40 ? 1 : -1)
        evt.stopPropagation()
        return
      }
      if (evt.keyCode === 13 || evt.keyCode === 9) {
        if (this.selectedIdx === -1 || !this.showOptions) {
          this.$emit('update:modelValue', this.modelValue)
          return
        }
        this.onItemClick(this.filteredItems[this.selectedIdx])
        return
      }
      if (evt.keyCode === 32) {
        if (!this.modelValue) {
          this.showOptions = true
          evt.stopPropagation()
        }
      }
      if (this.selectFirst && this.filteredItems.length) {
        this.selectedIdx = 0
      } else {
        this.selectedIdx = -1
      }
    },

    selectItem(adj) {
      if (!this.filteredItems || !this.filteredItems.length) {
        return
      }
      this.selectedIdx = Math.max(0, Math.min(this.filteredItems.length - 1, this.selectedIdx + adj))
      if (this.selectedIdx >= this.offset + this.numDisplay - 1) {
        this.offset = this.selectedIdx - this.numDisplay + 1
      } else if (this.selectedIdx < this.offset) {
        this.offset = this.selectedIdx
      }
    },

    onFocus() {
      this.prevValue = this.modelValue
    },

    onBlur() {
      clearTimeout(this.blurTimeout)
      this.blurTimeout = setTimeout(() => {
        this.showOptions = false
      }, 200)
    },
  },
}
</script>

<style lang="scss">
.ui-combo {
  .outer {
    position: relative;
    .options {
      position: absolute;
      top: 24px;
      left: 0px;
      right: 0px;
      z-index: 10;
    }
  }
}
</style>
