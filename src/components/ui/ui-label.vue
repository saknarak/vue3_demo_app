<template>
  <label class="ui-label" v-bind="$attrs">
    <slot />
  </label>
</template>

<style lang="scss">
.ui-label {
  height: 32px;
  line-height: 32px;
  display: block;
}
</style>
