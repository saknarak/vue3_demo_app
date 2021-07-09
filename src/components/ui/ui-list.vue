<template>
  <ul class="ui-list" :class="{ dense }">
    <slot />
  </ul>
</template>

<script>
import { computed } from 'vue'

export default {
  provide() {
    return {
      dense: computed(() => this.dense),
    }
  },

  props: {
    dense: Boolean,
  },
}
</script>

<style lang="scss">
.ui-list {
  margin: 0;
  padding: 0;
}
</style>
