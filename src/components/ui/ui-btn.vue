<template>
  <button
    type="button"
    class="ui-btn"
    :class="{ icon, disabled: isDisabled, small }"
    :disabled="isDisabled"
    v-bind="$attrs"
  >
    <div class="inner">
      <div v-if="$slots['prefix'] || prefixIcon" class="prefix">
        <slot name="prefix">
          <ui-icon :icon="prefixIcon" />
        </slot>
      </div>
      <div v-if="icon" class="icon">
        <ui-icon :icon="icon" />
      </div>
      <div v-else class="text mr-1">
        <slot />
      </div>
      <div v-if="$slots['suffix'] || suffixIcon" class="suffix">
        <slot name="suffix">
          <ui-icon :icon="suffixIcon" />
        </slot>
      </div>
    </div>
  </button>
</template>

<script>
import UiIcon from './ui-icon.vue'

export default {
  name: 'UiBtn',

  components: {
    UiIcon,
  },

  inject: {
    formDisabled: { default: false },
  },

  props: {
    prefixIcon: String,
    suffixIcon: String,
    width: [String, Number],
    icon: String,
    color: String,
    bgColor: String,
    disabled: Boolean,
    small: Boolean,
  },

  data() {
    return {}
  },

  computed: {
    isDisabled() {
      return this.disabled || this.formDisabled.value
    },
  },
}
</script>

<style lang="scss">
$btn-primary-color: rgb(8, 84, 160);

.ui-btn {
  display: flex;
  box-sizing: border-box;
  height: 28px;
  margin: 2px 0;
  padding: 1px;
  border: 1px solid $btn-primary-color;
  border-radius: 4px;
  color: $btn-primary-color;
  background-color: #fff;
  line-height: 24px;
  outline: none;
  > .inner {
    flex-grow: 1;
    display: flex;
    border: 1px solid transparent;
    padding: 1px 3px;
    border-radius: 4px;
    height: 24px;
    line-height: 20px;
    > .prefix {
      flex-shrink: 0;
      width: 20px;
      margin-right: 4px;
      text-align: center;
    }
    > .icon {
      width: 20px;
      line-height: 20px;
      text-align: center;
    }
    > .text {
      flex-grow: 1;
      line-height: 20px;
      text-align: center;
    }
    > .suffix {
      flex-shrink: 0;
      width: 20px;
      margin-left: 4px;
      text-align: center;
    }
  }
  &.icon {
    > .inner {
      padding: 1px;
    }
  }
  &:focus {
    > .inner {
      border: 1px dotted #000;
    }
  }
  &:hover {
    border: 1px solid $btn-primary-color;
  }
  &:active:not(:disabled) {
    border: 1px solid $btn-primary-color;
    background-color: $btn-primary-color;
    color: #fff;
    > .inner {
      border: 1px dotted #fff;
    }
  }
  &:disabled {
    filter: opacity(0.5);
    // filter: grayscale(1);
    cursor: default;
  }
  &.small {
    width: 24px;
    height: 24px;
    margin: 0;
    > .inner {
      padding: 1px;
      height: 20px;
      > .icon {
        width: 16px;
        line-height: 16px;
        .ui-icon {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
