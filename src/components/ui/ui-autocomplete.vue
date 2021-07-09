<template>
  <label
    class="ui-autocomplete"
    :class="{ focus: hasFocus, disabled: isDisabled, readonly: isReadonly }"
  >
    <div v-if="label" class="label flex-shrink-0 text-right">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="outer flex-grow-1">
      <div class="inner">
        <div v-if="$slots['prefix-icon'] || prefixIcon" class="prefix-icon">
          <slot name="prefix-icon">
            <ui-icon :icon="prefixIcon" />
          </slot>
        </div>
        <input
          ref="input"
          v-model="inputValue"
          class="input"
          :type="type"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :readonly="isReadonly"
          :autofocus="autofocus"
          :min="min"
          :max="max"
          :maxlength="maxlength"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeyDown"
        >
        <div v-if="showClearable || $slots['suffix-icon'] || suffixIcon" class="suffix-icon">
          <slot name="suffix-icon">
            <ui-icon v-if="showClearable" icon="clear" @click="doClear" />
            <ui-icon v-else :icon="suffixIcon" @click="showOptions = true" />
          </slot>
        </div>
      </div>
      <div v-if="$slots['outer-suffix'] || outerSuffixIcon" class="outer-suffix">
        <slot name="outer-suffix">
          <ui-icon :icon="outerSuffixIcon" />
        </slot>
      </div>
      <div v-if="showOptions" ref="options" class="options elevation-1">
        <ui-list dense>
          <ui-list-item
            v-for="(item, idx) of filteredItems.slice(offset, offset + numDisplay)"
            :key="item.value"
            class="px-2"
            :class="{ selected: idx + offset === selectedIdx }"
            @click.stop="onItemClick(item)"
          >
            <slot name="item" :item="item">
              {{ item[itemText] }}
            </slot>
          </ui-list-item>
        </ui-list>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'UiInput',

  inject: {
    formDisabled: { default: false },
    formReadonly: { default: false },
  },

  props: {
    outerPrefixIcon: String,
    outerSuffixIcon: String,
    prefixIcon: {
      type: String,
      default: 'label_outline',
    },
    suffixIcon: {
      type: String,
      default: 'expand_more',
    },
    width: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    autofocus: Boolean,
    min: [String, Number],
    max: [String, Number],
    maxlength: [String, Number],
    modelValue: [String, Number, Object],
    items: Array,
    selectFirst: Boolean,
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: String,
    numDisplay: {
      type: Number,
      default: 10,
    },
  },

  emits: [
    'update:modelValue',
    'update:keyword',
    'focus',
    'blur',
    'change',
    'clear',
  ],

  data() {
    return {
      hasFocus: false,
      selectedIdx: null,
      showOptions: false,
      inputValue: '',
      offset: 0,
    }
  },

  computed: {
    filteredItems() {
      let keyword = this.inputValue.trim()
      if (!keyword) {
        return this.items
      }
      return this.items.filter(x => {
        if (typeof x === 'object') {
          return String(x[this.itemText].toUpperCase()).indexOf(keyword.toUpperCase()) !== -1
        }
        return String(x).indexOf(keyword.toUpperCase()) !== -1
      })
    },

    hasOuterPrefix() {
      return this.$slots['outer-prefix'] || this.outerPrefixIcon
    },

    hasOuterSuffix() {
      return this.$slots['outer-suffix'] || this.outerSuffixIcon
    },

    showClearable() {
      return this.clearable && this.modelValue
    },

    isDisabled() {
      return this.disabled || this.formDisabled.value
    },

    isReadonly() {
      return this.readonly || this.formReadonly.value
    },
  },

  watch: {
    modelValue(v) {
      if (!v) {
        this.selectedIdx = -1
        this.inputValue = ''
        return
      }
      let t = typeof v
      if (t === 'string' || t === 'number') {
        this.inputValue = v
      } else {
        this.inputValue = v[this.itemText] || ''
      }
    },
  },

  methods: {
    // PUBLIC METHOD
    focus() {
      this.$refs.input.focus()
    },

    select() {
      this.$refs.input.select()
    },

    onFocus() {
      clearTimeout(this.blurTimeout)
      this.hasFocus = true
      this.prevValue = this.modelValue
      this.$emit('focus')
    },

    onBlur() {
      this.hasFocus = false
      if (!this.inputValue && this.modelValue) {
        this.$emit('update:modelValue', null)
        return
      }
      if (this.modelValue) {
        this.inputValue = this.modelValue[this.itemText] || ''
      } else {
        this.inputValue = ''
      }
      this.$emit('blur')
      this.blurTimeout = setTimeout(() => {
        this.showOptions = false
      }, 200)
    },

    doClear() {
      this.$emit('clear')
    },

    onInput() {
      this.showOptions = true
      this.selectItem(0)
      this.$emit('update:keyword', this.inputValue.trim())
    },

    onKeyDown(evt) {
      if (evt.keyCode === 27) {
        this.$emit('update:modelValue', this.prevValue)
        if (this.prevValue) {
          this.inputValue = this.prevValue[this.itemText] || ''
        } else {
          this.inputValue = ''
        }
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
          return
        }
        this.onItemClick(this.filteredItems[this.selectedIdx])
      }
      if (evt.keyCode === 32) {
        this.inputValue = this.inputValue.trim()
        if (!this.inputValue) {
          this.showOptions = true
          evt.stopPropagation()
        }
      }
    },

    onItemClick(item) {
      this.showOptions = false
      this.prevValue = this.modelValue
      this.$emit('update:modelValue', item)
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
  },
}
</script>

<style lang="scss">
.ui-autocomplete {
  display: flex;
  box-sizing: border-box;
  height: 32px;
  padding: 2px 4px;
  color: #333;
  > .label {
    box-sizing: border-box;
    line-height: 26px;
    margin-right: 4px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  > .outer {
    border: 1px solid #999;
    border-radius: 4px;
    padding: 1px;
    background-color: #fff;
    line-height: 24px;
    position: relative;
    > .inner {
      display: flex;
      flex-grow: 1;
      box-sizing: border-box;
      height: 24px;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 1px 3px;
      > .prefix-icon {
        flex-shrink: 0;
        width: 20px;
        line-height: 20px;
        text-align: center;
        margin-right: 4px;
      }
      > .input {
        flex-grow: 1;
        outline: none;
        border: none;
        height: 20px;
        line-height: 20px;
        width: 100%;
        background-color: transparent;
        &::placeholder {
          font-style: italic;
        }
      }
      > .suffix-icon {
        flex-shrink: 0;
        width: 20px;
        line-height: 20px;
        text-align: center;
        margin-left: 4px;
      }
    }
    > .options {
      position: absolute;
      top: 24px;
      left: 0px;
      right: 0px;
      z-index: 10;
    }
  }

  &.focus {
    > .outer {
      > .inner {
        border: 1px dotted #000;
      }
    }
  }
  &.readonly {
    color: #808080;
    .input {
      color: #808080;
    }
  }
  &.disabled {
    background-color: rgba(0, 0, 0, 0.05);
    color: #808080;
    .input {
      color: #808080;
    }
  }
}
</style>
