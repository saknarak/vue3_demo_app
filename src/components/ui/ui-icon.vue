<template>
  <i class="ui-icon material-icons" :class="small" :style="{ fontSize: size && `${size}px` }">{{ icon }}</i>
</template>

<script>
export default {
  name: 'UiIcon',

  props: {
    icon: {
      type: String,
      default: 'label',
    },

    size: {
      type: [String, Number],
    },

    small: Boolean,
  },
}
</script>

<style lang="scss">
.ui-icon {
  cursor: default;
  &.small {
    font-size: 20px;
    width: 20px;
    line-height: 20px;
  }
}
</style>
