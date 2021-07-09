<template>
  <li
    class="ui-list-item d-flex"
    :class="{ dense: dense.value }"
  >
    <div v-if="$slots.icon" class="icon mx-4 my-1 flex-shrink-0">
      <slot name="icon">
        <ui-icon icon="star_border" size="24" />
      </slot>
    </div>
    <div class="content flex-grow-1 text-truncate">
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  inject: {
    dense: { default: false },
  },
}
</script>

<style lang="scss">
.ui-list-item {
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    opacity: 1;
  }
  &.selected {
    background-color: blue;
    color: #fff;
  }
  &.dense {
    height: 24px;
    line-height: 24px;
    .icon {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
