<template>
  <label
    class="ui-input"
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
        <select
          ref="input"
          :value="modelValue"
          class="input"
          :disabled="isDisabled"
          :readonly="isReadonly"
          @input="e => $emit('update:modelValue', e.target.value)"
          @focus="onFocus"
          @blur="onBlur"
        >
          <option v-for="item in items" :value="item.value" :key="item.value">
            {{ item.text }}
          </option>
        </select>
        <div v-if="$slots['inner-suffix'] || innerSuffixIcon" class="inner-suffix">
          <slot name="inner-suffix">
            <ui-icon :icon="innerSuffixIcon" />
          </slot>
        </div>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'UiSelect',

  inject: {
    formDisabled: { default: false },
    formReadonly: { default: false },
  },

  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    label: String,
    prefixIcon: {
      type: String,
      default: 'label_outline',
    },
    innerSuffixIcon: String,
    readonly: Boolean,
    disabled: Boolean,
    modelValue: [String, Number, Object],
  },

  emits: [
    'update:modelValue',
  ],

  data() {
    return {
      hasFocus: false,
    }
  },

  computed: {
    isDisabled() {
      return this.disabled || this.formDisabled.value
    },

    isReadonly() {
      return this.readonly || this.formReadonly.value
    },
  },

  methods: {
    // PUBLIC
    focus() {
      this.$refs.input.focus()
    },

    onFocus() {
      this.hasFocus = true
    },

    onBlur() {
      this.hasFocus = false
    },
  },
}
</script>

<style lang="scss">
.ui-select {
  display: flex;
  box-sizing: border-box;
  margin: 2px;
  height: 28px;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 1px;
  background-color: #fff;
  line-height: 24px;
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
    > .inner {
          display: flex;
      flex-grow: 1;
      box-sizing: border-box;
      height: 24px;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 1px 3px;
      > .input {
        min-width: 80px;
        flex-grow: 1;
        outline: none;
        border: none;
        height: 20px;
        line-height: 20px;
        width: 100%;
        background-color: transparent;
      }
    }
  }
  &.focus {
    > .inner {
      border: 1px dotted #000;
    }
  }
}
</style>
