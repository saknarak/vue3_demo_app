<template>
  <div class="ui-tabs px-2 pt-1">
    <div
      v-for="(item, idx) of items"
      :key="item[itemValue]"
      class="tab rounded-tl rounded-tr"
      :class="{ active: item[itemValue] === modelValue }"
      :tabindex="idx"
      @click="$emit('update:modelValue', item[itemValue])"
      @keydown.stop.enter.space="$emit('update:modelValue', item[itemValue])"
      :accesskey="idx + 1"
    >
      <div class="inner px-2">
        <span class="access-key">{{ idx + 1 }}</span> {{ item[itemText] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiTabs',

  props: {
    items: Array,
    itemValue: {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    modelValue: String,
  },

  emits: [
    'update:modelValue',
  ],
}
</script>

<style lang="scss">
@import "../../assets/vars.scss";

.ui-tabs {
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  height: 32px;
  line-height: 32px;
  > .tab {
    display: inline-block;
    height: 28px;
    line-height: 24px;
    background-color: #fff;
    border-top: 4px solid transparent;
    outline: none;
    padding: 1px;
    color: rgba(0, 0, 0, 0.5);
    .inner {
      border: 1px solid transparent;
      line-height: 20px;
    }
    &:not(:first-child) {
      margin-left: 4px;
    }
    &.active {
      border-top: 4px solid $color-primary;
      color: rgba(0, 0, 0, 1.0);
    }
    &:focus {
      .inner {
        border: 1px dotted #000;
      }
    }
  }
}
</style>
