<template>
  <div class="ui-card-actions d-flex flex-direction-row justify-end">
    <slot />
  </div>
</template>

<style lang="scss">
.ui-card-actions {
  > *:not(:first-child) {
    margin-left: 4px;
  }
}
</style>
