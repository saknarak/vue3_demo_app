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
        <input
          ref="input"
          class="input"
          :type="type"
          :value="modelValue"
          @input="e => $emit('update:modelValue', e.target.value)"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :readonly="isReadonly"
          :autofocus="autofocus"
          :min="min"
          :max="max"
          :maxlength="maxlength"
          @focus="onFocus"
          @blur="onBlur"
          @change="e => $emit('change', e.target.value)"
        >
        <div v-if="showClearable || $slots['suffix-icon'] || suffixIcon" class="suffix-icon">
          <slot name="suffix-icon">
            <ui-icon v-if="showClearable" icon="clear" @click="doClear" />
            <ui-icon v-else :icon="suffixIcon" />
          </slot>
        </div>
      </div>
      <div v-if="$slots['outer-suffix'] || outerSuffixIcon" class="outer-suffix">
        <slot name="outer-suffix">
          <ui-icon :icon="outerSuffixIcon" />
        </slot>
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
    suffixIcon: String,
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
    modelValue: [String, Number],
  },

  emits: [
    'update:modelValue',
    'focus',
    'blur',
    'change',
    'clear',
  ],

  data() {
    return {
      hasFocus: false,
    }
  },

  computed: {
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

  methods: {
    // PUBLIC METHOD
    focus() {
      this.$refs.input.focus()
    },

    select() {
      this.$refs.input.select()
    },

    onFocus() {
      this.hasFocus = true
      this.$emit('focus')
    },

    onBlur() {
      this.hasFocus = false
      this.$emit('blur')
    },

    doClear() {
      this.$emit('clear')
    },
  },
}
</script>

<style lang="scss">
.ui-input {
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
  &.center {
    .input {
      text-align: center;
    }
  }
  &.right {
    .input {
      text-align: right;
    }
  }
}
</style>
